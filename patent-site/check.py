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
views = fragments = 0  # source views and their quoted passages over every chart on every page
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
                views += 1
                assert not view.get('unavailable'), (path, row, view.get('citation'), 'an inline source view without its page: render the page from its public copy')
                assert view['pdfPage'] <= view['pageCount']
                if view.get('webPage'):  # a print of a web page links the page itself
                    assert view['originalUrl'].startswith('https://') and '#' not in view['originalUrl'], (path, row, view['originalUrl'])
                else:
                    assert view['originalUrl'].endswith('#page=' + str(view['pdfPage']))
                image = (path.parent / view['image']).resolve()
                assert image.is_relative_to(ROOT.resolve()) and image.is_file()
                assert image.read_bytes().startswith(b'\x89PNG\r\n\x1a\n')
                for fragment in view['fragments']:
                    fragments += 1
                    assert fragment['quote']
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

# Every rendered quotation is highlighted on its page, whether located in a text layer or, on a page
# without one, by OCR word boxes; source-pages.mjs is two JSON exports, read here without the site.
generated = (ROOT.parent / 'patent-site/source-pages.mjs').read_text()
marker = 'export const sourcePages = '
source_pages = json.loads(generated[generated.index(marker) + len(marker):].rstrip().removesuffix(';'))
for page_id, source_page in source_pages.items():
    for fragment_id, fragment in source_page['fragments'].items():
        assert fragment['rects'], (page_id, fragment_id, 'a quotation without its highlight'
                                   + (' on a page without a text layer' if source_page.get('textLayer') is False else ''))

assert len(pages) == 15, f'Expected 14 pages plus 404; found {len(pages)}'
assert len(list((ROOT / 'research').glob('*/index.html'))) == 7
print(f'Passed: {len(pages)} HTML pages, metadata, unique IDs, internal links, evidence records and brand checks; '
      f'{len(source_pages)} source pages, every quotation highlighted; {views} source views on the pages, all rendered, '
      f'with {fragments} quoted passages, 0 without a highlight.')
