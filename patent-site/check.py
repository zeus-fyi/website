"""Validate generated pages, local routes, evidence data and source-site isolation."""
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent / 'patents'

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path, self.ids, self.links, self.h1 = path, set(), [], 0
        self.title = self.description = self.canonical = False
        self.data = None

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

pages = {}
for path in sorted(ROOT.rglob('*.html')):
    content = path.read_text()
    parsed = Page(path)
    parsed.feed(content)
    assert parsed.h1 == 1 and parsed.title and parsed.description and parsed.canonical, path
    assert 'name="viewport"' in content and 'lang="en"' in content, path
    assert not re.search(r'\bZeus\b|[\u2190-\u21ff]|[\U0001f300-\U0001faff]', content), path
    data = re.search(r'<script type="application/json" data-evidence-data>(.*?)</script>', content, re.S)
    if data:
        evidence = json.loads(data[1])
        assert len(evidence) == 9 and evidence['P2']['summary'] is True
        assert 'C 50' in evidence['16c2']['label']
        assert all(x.get('passages') and x.get('limit') for x in evidence.values())
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

assert len(pages) == 14, f'Expected 13 pages plus 404; found {len(pages)}'
assert len(list((ROOT / 'research').glob('*/index.html'))) == 6
print(f'Passed: {len(pages)} HTML pages, metadata, unique IDs, internal links, evidence records and brand checks.')
