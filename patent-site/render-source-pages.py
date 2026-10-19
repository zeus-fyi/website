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
# Ligatures (fi, ff) are expanded and hyphenated line breaks joined, so a quote matches the words as printed.
SEARCH_FLAGS = fitz.TEXT_DEHYPHENATE | fitz.TEXT_MEDIABOX_CLIP
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
    # GridScale Solutions, US 8,842,454 B2: the submitted anticipation by US 5,764,503 A.
    'brand-503': {
        'reference': 'R1',
        'title': 'Brand et al., US 5,764,503 A',
        'edition': 'United States patent · Digital Equipment Corporation · Issued 9 June 1998',
        'url': 'https://patentimages.storage.googleapis.com/6b/a1/06/6702d1cc15910b/US5764503.pdf',
        'sha256': 'b53b8b8a2f2e32f529f5844f5f2d3b8728de5574ce259b4d28ebe8317852e4b4',
        'sourceNote': PATENT_NOTE,
    },
    # Nordic Unmanned, EP 2 035 276 B1 and US 8,328,128 B2: the two submitted charts' references.
    'starmac-iros': {
        'reference': 'R10',
        'title': 'STARMAC: Multi-Agent Quadrotor Testbed Control Design',
        'edition': 'Waslander, Hoffmann, Jang and Tomlin · IEEE/RSJ IROS 2005, Edmonton, 2–6 August 2005 · Authors’ copy',
        'url': 'https://people.eecs.berkeley.edu/~tomlin/papers/conferences/whjt05_iros.pdf',
        'sha256': 'e4275469658105d0836475a6c1f0bc196ac26b68554ce3690857858aab4ef7d9',
        'sourceNote': 'Authors’ copy of the conference paper, hosted on the authors’ university pages. Printed pages 468–473.',
    },
    'starmac-dasc': {
        'reference': 'R10-DASC',
        'title': 'The Stanford Testbed of Autonomous Rotorcraft for Multi Agent Control (STARMAC)',
        'edition': 'Hoffmann et al. · 23rd Digital Avionics Systems Conference, Salt Lake City, 24–28 October 2004 · Authors’ copy',
        'url': 'https://people.eecs.berkeley.edu/~tomlin/papers/conferences/hrwdjt04_dasc.pdf',
        'sha256': 'd91b5addc85ea20a868fea83aafa5e8869217fdd3d3c2015304cdec16873f735',
        'sourceNote': 'Authors’ copy of the conference paper, hosted on the authors’ university pages. Printed pages 12.E.4-1 to 12.E.4-10.',
    },
    'kinoshita-383': {
        'reference': 'R2',
        'title': 'Kinoshita, US 5,071,383',
        'edition': 'United States patent · Radio-controlled flying apparatus · Issued 10 December 1991',
        'url': 'https://patentimages.storage.googleapis.com/61/a9/f1/3216608039ca31/US5071383A.pdf',
        'sha256': 'b623b885c32875d808576e977ad486da87712922b6277a351b01b92b7b3e5673',
        'sourceNote': PATENT_NOTE,
    },
    'spirov-357': {
        'reference': 'R5',
        'title': 'Spirov and Pedersen, WO 2004/101357 A2',
        'edition': 'International application · Homeostatic flying hovercraft · Published 25 November 2004',
        'url': 'https://patentimages.storage.googleapis.com/03/d0/57/31e28c8fc701c9/WO2004101357A2.pdf',
        'sha256': 'ca91783b160f73f0cac018b11e0eb4ebecf58c6054b55994d31e18d8cace221c',
        'sourceNote': PATENT_NOTE,
    },
    'louvel-921': {
        'reference': 'R1',
        'title': 'Louvel, US 2002/0104921 A1',
        'edition': 'United States patent application publication · Electrical remote-control and remote-power flying saucer · 8 August 2002',
        'url': 'https://patentimages.storage.googleapis.com/b7/ab/e2/52a8a6f7cfe2c8/US20020104921A1.pdf',
        'sha256': '8b167c5323a9eca8fbab616e6005584df76a20fe66a44c3503bff3b6141789eb',
        'sourceNote': PATENT_NOTE,
    },
    'pauli-916': {
        'reference': 'R3',
        'title': 'Pauli, DE 102 56 916 A1',
        'edition': 'German patent application · Hubschrauber · Published 9 September 2004 · German original; the translation is the researcher’s',
        'url': 'https://patentimages.storage.googleapis.com/0c/7b/a9/b2ee4ce66c257a/DE10256916A1.pdf',
        'sha256': '684522301247997ac22e76b815638e5354fdba53a21ccd25699ea3263774efad',
        'sourceNote': PATENT_NOTE,
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
    # GridScale: US 5,764,503 A. Its text layer is an OCR of the 1998 print, so each quote is a
    # contiguous span the layer carries; the hyphenated line ends it drops are avoided.
    ('brand-503', 'Columns 1–2', 12, {
        'field': 'This invention relates to the field of electrical power supplies and, more particularly, power supplies which',
    }),
    ('brand-503', 'Columns 5–6', 14, {
        'regulator': 'Voltage regulator 208 does filtering, power factor correction and ultimately outputs a regulated DC voltage 210 (in the preferred embodiment +/-200 volts) to current controlled AC voltage source 212.',
        'sensor': 'Current voltage sensor 22 monitors the total voltage and total current being supplied by one (or more) transverters operating in a particular voltage phase. The monitored voltage sense 26 and monitored current sense 24 are fed back to system control module 18 as hereinbefore described.',
        'receives': 'Current controlled voltage source 212 receives transverter control current 20, as an input 214 having a return 216.',
        'switching': 'FET switch controller 224, controls FET switch assemblies 226, 228, 230 and 232 which generate current through secondary winding 219 such that the flux in transformer 218 maintains balance.',
    }),
    ('brand-503', 'Columns 7–8', 15, {
        'plurality': 'In FIG. 14, a plurality 248 of transverters',
        'parallel': 'on the same power source voltage phase, are interconnected such that their outputs 249 are in parallel',
        'series': 'However, transverter control signal 20 is fed to and through plurality 248 over series interconnection 250',
        'same': 'such that each of the transverters of plurality 248 receive the same transverter',
    }),
    # Nordic Unmanned: the STARMAC papers, Kinoshita, Spirov and Pedersen, Louvel and Pauli.
    ('starmac-iros', 468, 1, {
        'vehicle': 'The base vehicle for STARMAC is a four rotor aircraft with fixed pitch blades, referred to as a quadrotor, or an X4-flyer.',
        'hover': 'The first major milestone for STARMAC was autonomous hover control, with closed loop control of attitude, altitude and position. Using inertial sensing, the attitude of the aircraft is simple to control, by applying small variations in the relative speeds of the blades.',
    }),
    ('starmac-iros', 470, 3, {
        'loops': 'Applying the concept of spectral separation, inner loop control of attitude and altitude is performed by commanding motor voltages, and outer loop position control is performed by commanding attitude requests for the inner loop.',
    }),
    ('starmac-dasc', 'Printed p. 12.E.4-1', 1, {
        'frame': 'The quadrotor helicopter, or X4 flyer, has four fixed-pitch rotors mounted at the four ends of a simple cross frame.',
    }),
    ('starmac-dasc', 'Printed p. 12.E.4-4', 4, {
        'pwm': 'The Control PIC is connected to each of the motors via PWM outputs',
    }),
    ('starmac-dasc', 'Printed p. 12.E.4-8', 8, {
        'onboard': 'This controller was implemented in floating point onboard the X4 flyer.',
        'thrust': 'The control inputs for each rotor corresponding to pitch, roll and yaw are computed separately, and then added to the altitude input and the nominal thrust to yield the net thrust value for each rotor.',
    }),
    ('kinoshita-383', 'Columns 3–4', 11, {
        'opposite': 'The variable speed motors are attached to propellers 18 and 24 which rotate in opposite directions.',
    }),
    ('kinoshita-383', 'Columns 5–6', 12, {
        'independent': 'being rotated in opposite directions, each of said propellers being rotated at a rotational speed independent of the other propeller',
        'speed': 'each of said propellers being rotated at a rotational speed independent of the other propeller',
        'shaft': 'said second propeller securely attached to a rod shaft which extends longitudinally through said sleeve shaft',
    }),
    ('spirov-357', 19, 20, {
        'pair': 'In an alternate embodiment that provides for more efficiency, each of the ducted fans 40 has two counter-rotating multi-bladed units.',
    }),
    ('louvel-921', 'Publication page 7', 7, {
        'aircraft': 'The invention is an aircraft, remotely controlled',
        'powered': 'powered by propellers driven by electric motors, whose characteristics enable this device to perform',
        'propellers': 'the aircraft includes four propellers (10), (11), (12), (13) with vertical axis, that provides the lift thrust.',
        'independent': 'Each propeller is driven independently by an',
        'motor': 'The propeller (10) is driven by the motor (20).',
        'frame': 'The frame that bears the motors is made of two rectangular boards (30) and (31), arranged in a vertical plane and that intersect in the central part of the aircraft.',
    }),
    ('louvel-921', 'Publication page 8', 8, {
        'sensors': 'The aircraft is fitted with three attitude sensors whose purpose is to provide information for the closed loop control.',
        'boards': 'The board (30) bears the motors (10) and (12). The other board (31) bears the motors (11) and (13)',
    }),
    ('louvel-921', 'Publication page 9', 9, {
        'pwm': 'The function of the control unit (3) is to control the speed of each electric motor by adjusting the current in each of them by a pulse width modulation (PWM) current drive.',
    }),
    ('louvel-921', 'Publication page 10', 10, {
        'loop': 'When there is no action on the handle, the control loop uses the data coming from the various sensors (61), (62) and (63) to converge towards the horizontal normal attitude of the aircraft and to cancel the yaw movement.',
        'tilt': 'If the information supplied by the sensor (61) indicates that the aircraft is tilting towards the right side, then the correction consists in increasing the speed of the propeller 11, decreasing the speed of the propeller 13, meanwhile the speeds of the propellers 10 and 12 remain unchanged.',
    }),
    ('pauli-916', 'Publication page 2', 2, {
        'opposite': ('Der obere und untere Propeller werden zur gegengesetzten Rotation unabhängig voneinander durch entsprechende Triebwerke gebracht.',
                     'The upper and lower propellers are driven to opposite rotation, independently of each other, by respective engines.'),
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
            translation = None
            if isinstance(quote, tuple):
                quote, translation = quote  # a foreign-language passage with the researcher's translation
            rectangles = page.search_for(quote, flags=SEARCH_FLAGS) if text_layer else []
            if text_layer and not rectangles:
                raise ValueError(f'Quotation not found on {page_id}: {quote}')
            fragments[fragment_id] = {
                'quote': quote,
                **({'translation': translation} if translation else {}),
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
