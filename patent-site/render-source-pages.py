"""Render cited PDF pages and locate quotation highlights in PDF coordinates.

Pass a cache directory. Each document is fetched from its public URL into that
directory unless the cached copy already matches its recorded SHA-256, and no
asset is written for a document whose bytes do not match the record. The record
is the case's exhibit hash where the case holds the same document. A quotation
the script cannot find on its page is an error; the only exception is a scanned
page with no text layer, which is rendered without highlights and marked so.
Requires PyMuPDF; generated page images and metadata are committed with the site.
"""
import hashlib
import json
from pathlib import Path
import sys
import urllib.request

import fitz

ROOT = Path(__file__).resolve().parent.parent
IMAGE_WIDTH = 1680  # Sharp at 2x density in the page viewer, with room to enlarge.
USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
PATENT_NOTE = 'Public copy of the patent document as published by its patent office; served by Google Patents.'
DOCUMENTS = {
    'sma': {
        'reference': 'R1',
        'title': 'SMA Sunny Boy / Sunny Mini Central',
        'edition': 'User Manual · SB_SMC-BEN082220 · Version 2.0',
        'archiveDate': '21 November 2008',
        'url': 'https://web.archive.org/web/20081121223617id_/http://download.sma.de/smaprosa/dateien/1348/SB_SMC_neu-BEN082220.pdf',
        'sha256': 'f3618446c1203da30da242fed7d5946d4408415e6025b0b6f6937f26ff2311ec',
    },
    'sunways': {
        'reference': 'R4',
        'title': 'Sunways Solar Inverter AT',
        'edition': 'User Manual · AT 5000 / 4500 / 3600 / 2700 · English 07/09',
        'archiveDate': '25 May 2010',
        'url': 'https://web.archive.org/web/20100525025008id_/http://www.sunways.eu/static/sites/default/downloads/en/products/solar-inverters/at/Sunways_SI_AT_Manual_GB_09-07.pdf',
        'sha256': 'c9ed5494a3c6f747aa4ddb96416afc388f03c3fc7557c157bd17fae6cb18909b',
    },
}
# Printed page, PDF page (one-based), and exact source quotations. Separately
# selectable fragments let several limitations highlight the same original page.
# A printed page given as text (such as "Columns 5–6") is the page's label where
# the document prints no page number of its own; the page id then uses the PDF page.
PAGES = [
    ('sma', 13, 13, {
        'tracker': 'Since each individual input has its own MPP tracker, the strings may differ in respect to the type of modules used and their alignment.',
    }),
    ('sma', 16, 16, {
        'indicators': 'The different operating modes are displayed via three light-emitting diodes (LEDs) on the inverter housing cover',
        'actuation': 'To allow the device to signal its operating mode via the 3 integrated LEDs, the inverter must be connected to the DC side of the system.',
    }),
    ('sma', 23, 23, {
        'inputs': 'At least one of the two or three DC inputs is defective.',
    }),
    ('sma', 40, 40, {
        'measurement': 'PPV DC-A PV generator output string A (multi-string inverters only)',
    }),
    ('sma', 44, 44, {
        'fault': 'DC-A def. DC-B def. DC-C def. A string input is defective. Contact SMA if this fault is displayed.',
    }),
    ('sunways', 27, 30, {
        'combined': 'The combined red/green LED indicates the device status of the Solar Inverter:',
        'working': 'LED green, continuously lit Solar Inverter is active and feeds into power grid (MPP mode)',
        'warning': 'LED green, flashing Solar Inverter is active and feeds into power grid, however with current, output or temperature limitation.',
        'redWarning': 'LED red, flashing a warning has been issued',
        'error': 'LED red, continuously lit an error has occurred (malfunction)',
        'off': 'LED off Solar Inverter is not active (night mode)',
    }),
    ('sunways', 38, 41, {
        'grid': '2: Error in the area of the AC network',
    }),
]


def fetch(cache_directory, key, metadata):
    """Return the document's bytes from the cache or its public URL; they must match the record."""
    cached = cache_directory / (key + '.pdf')
    if cached.is_file():
        data = cached.read_bytes()
        if hashlib.sha256(data).hexdigest() == metadata['sha256']:
            return data
        print(f'Cached {key}.pdf does not match its record; fetching again.')
    request = urllib.request.Request(metadata['url'], headers={'User-Agent': USER_AGENT})
    with urllib.request.urlopen(request, timeout=120) as response:
        data = response.read()
    digest = hashlib.sha256(data).hexdigest()
    if digest != metadata['sha256']:
        raise ValueError(f'{key}: the public copy ({digest}) does not match the recorded edition ({metadata["sha256"]}); nothing written')
    cache_directory.mkdir(parents=True, exist_ok=True)
    cached.write_bytes(data)
    print(f'Fetched {key}.pdf ({len(data)} bytes), SHA-256 verified.')
    return data


def render(cache_directory):
    documents = {}
    for key, metadata in DOCUMENTS.items():
        documents[key] = fitz.open(stream=fetch(cache_directory, key, metadata), filetype='pdf')
        metadata['pageCount'] = len(documents[key])

    output = ROOT / 'patents/assets/sources'
    output.mkdir(parents=True, exist_ok=True)
    pages = {}
    scanned = []
    for key, printed_page, pdf_page, quotes in PAGES:
        page = documents[key][pdf_page - 1]
        page_label = printed_page if isinstance(printed_page, str) else None
        if page_label:
            printed_page = pdf_page
        page_id = f'{key}-{printed_page}'
        if page_id in pages:
            raise ValueError('Page listed twice: ' + page_id)
        text_layer = bool(page.get_text().strip())
        fragments = {}
        for fragment_id, quote in quotes.items():
            rectangles = page.search_for(quote) if text_layer else []
            if text_layer and not rectangles:
                raise ValueError(f'Quotation not found on {page_id}: {quote}')
            fragments[fragment_id] = {
                'quote': quote,
                'rects': [[round(r.x0 / page.rect.width * 100, 4),
                           round(r.y0 / page.rect.height * 100, 4),
                           round(r.width / page.rect.width * 100, 4),
                           round(r.height / page.rect.height * 100, 4)]
                          for r in rectangles],
            }
        image = page.get_pixmap(matrix=fitz.Matrix(IMAGE_WIDTH / page.rect.width,
                                                  IMAGE_WIDTH / page.rect.width), alpha=False)
        image.save(output / (page_id + '.png'))
        pages[page_id] = {
            'document': key, 'printedPage': printed_page, 'pdfPage': pdf_page,
            'image': 'sources/' + page_id + '.png',
            'width': image.width, 'height': image.height, 'fragments': fragments,
        }
        if page_label:
            pages[page_id]['pageLabel'] = page_label
        if not text_layer:
            pages[page_id]['textLayer'] = False
            scanned.append(page_id)

    target = ROOT / 'patent-site/source-pages.mjs'
    target.write_text('// Original page images and text coordinates; generated by render-source-pages.py.\n'
                      + 'export const sourceDocuments = ' + json.dumps(DOCUMENTS, indent=2, ensure_ascii=False) + ';\n'
                      + 'export const sourcePages = ' + json.dumps(pages, indent=2, ensure_ascii=False) + ';\n')
    print(f'Rendered {len(pages)} original pages with verified quotation coordinates.')
    for page_id in scanned:
        print(f'No text layer on {page_id}: rendered without highlights; its quotes are shown beside the page.')


if __name__ == '__main__':
    render(Path(sys.argv[1]))
