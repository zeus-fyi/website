"""Validate generated pages, local routes, evidence data and source-site isolation."""
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent / 'patents'
BANDS = {'A': (90, 100), 'B': (75, 89), 'C': (45, 74), 'D': (20, 44), 'E': (0, 19)}  # the band scale's score ranges

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path, self.ids, self.links, self.h1 = path, set(), [], 0
        self.title = self.description = self.canonical = False
        self.data = None
        self.modules = []  # per chart module, (id, aria-pressed) of each strip button in page order

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            assert a['id'] not in self.ids, f'{self.path}: duplicate ID {a["id"]}'
            self.ids.add(a['id'])
        self.h1 += tag == 'h1'
        self.title |= tag == 'title'
        self.description |= tag == 'meta' and a.get('name') == 'description' and bool(a.get('content'))
        self.canonical |= tag == 'link' and a.get('rel') == 'canonical'
        for key in ('src', 'href'):
            if key in a:
                self.links.append(a[key])
        if tag == 'section' and 'data-evidence' in a:
            self.modules.append([])
        if tag == 'button' and 'data-score' in a:
            self.modules[-1].append((a['data-score'], a.get('aria-pressed')))

pages = {}
for path in sorted(ROOT.rglob('*.html')):
    content = path.read_text()
    parsed = Page(path)
    parsed.feed(content)
    assert parsed.h1 == 1 and parsed.title and parsed.description and parsed.canonical, path
    assert 'name="viewport"' in content and 'lang="en"' in content, path
    assert not re.search(r'\bZeus\b|[\u2190-\u21ff]|[\U0001f300-\U0001faff]', content), path
    blocks = re.findall(r'<script type="application/json" data-evidence-data>(.*?)</script>', content, re.S)
    assert len(blocks) == len(parsed.modules), (path, 'one data block per chart module')
    for scores, block in zip(parsed.modules, blocks):
        evidence = json.loads(block)
        assert [row for row, _ in scores] == list(evidence), (path, 'strip rows differ from the records')
        pressed = [row for row, state in scores if state == 'true']
        assert len(pressed) == 1 and evidence[pressed[0]]['label'].endswith(' · Weakest'), (path, 'one selected row, the weakest')
        for row, record in evidence.items():
            assert record.get('views') and record.get('limit') and record.get('mapping') and record.get('pinpoint'), (path, row)
            kind, rated = record['label'].split(' · ')[:2]
            assert kind.endswith(' ' + row) and kind.startswith('Claim-wide point' if record['summary'] else ('Preamble' if row.endswith('pre') else 'Limitation')), (path, row)
            band, score = rated.split(' ')
            assert band in BANDS and BANDS[band][0] <= int(score) <= BANDS[band][1], (path, row, rated)
            for view in record['views']:
                assert view['fragments'], (path, row)
                if view.get('unavailable'):
                    assert view['citation'] and all(not fragment['rects'] and fragment['quote'] for fragment in view['fragments']), (path, row, 'an unavailable page keeps its quotes and citation')
                    continue
                assert view['pdfPage'] <= view['pageCount']
                assert view['originalUrl'].endswith('#page=' + str(view['pdfPage']))
                image = (path.parent / view['image']).resolve()
                assert image.is_relative_to(ROOT.resolve()) and image.is_file()
                assert image.read_bytes().startswith(b'\x89PNG\r\n\x1a\n')
                for fragment in view['fragments']:
                    assert fragment['quote']
                    if view.get('highlights') is False:
                        assert not fragment['rects'], (path, row, 'a scanned page carries no highlight')
                    else:
                        assert fragment['rects'], (path, row, 'a quote without its highlight')
                    for x, y, width, height in fragment['rects']:
                        assert 0 <= x < 100 and 0 <= y < 100
                        assert width > 0 and height > 0
                        assert x + width <= 100 and y + height <= 100
    pages[path.resolve()] = parsed

for path, page in pages.items():
    for link in page.links:
        url = urlsplit(link)
        if url.scheme or url.netloc:
            assert url.scheme in ('https', 'mailto'), (path, link)
            continue
        target = (ROOT / unquote(url.path).lstrip('/')) if url.path.startswith('/') else (path.parent / unquote(url.path))
        if not url.path:
            target = path
        elif target.is_dir():
            target /= 'index.html'
        target = target.resolve()
        assert target.is_relative_to(ROOT.resolve()), (path, 'escaping site root', link)
        assert target.is_file(), (path, 'missing local target', link)
        if url.fragment and target.suffix == '.html':
            assert url.fragment in pages[target].ids, (path, 'missing fragment', link)

assert len(pages) == 15, f'Expected 14 pages plus 404; found {len(pages)}'
assert len(list((ROOT / 'research').glob('*/index.html'))) == 7
print(f'Passed: {len(pages)} HTML pages, metadata, unique IDs, internal links, evidence records and brand checks.')
