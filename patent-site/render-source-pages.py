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
    # GridScale: the GE reference of the filed backup ground for limitation 1a.
    'ge-267': {
        'reference': 'A-3',
        'title': 'Liu, Garces and Bose, US 2010/0057267 A1',
        'edition': 'United States patent application publication · General Electric · 4 March 2010',
        'url': 'https://patentimages.storage.googleapis.com/5e/a2/b1/153837f1d1e33a/US20100057267A1.pdf',
        'sha256': '1cb0b0fb8b06afe59a3488fc45941c8c5b97849aead59a7abea2155b2f4ab735',
        'sourceNote': PATENT_NOTE,
    },
    # Sol IP, US 10,090,894 B2 claim 7: the submitted chart's two references.
    'broadcom-800': {
        'reference': 'Ref. 1',
        'title': 'Trachewsky, Kondylis and Bagchi, US 2005/0181800 A1',
        'edition': 'United States patent application publication · Signaling format for WLANs · 18 August 2005',
        'url': 'https://patentimages.storage.googleapis.com/c5/ec/3f/6d06966c707172/US20050181800A1.pdf',
        'sha256': 'bd8f9a684beee7142c7654087efd4a35575e4ca333b935e4edd36e5e3abbf4a2',
        'sourceNote': PATENT_NOTE,
    },
    'cisco-530': {
        'reference': 'Ref. 2',
        'title': 'Miller et al., US 7,231,530 B1',
        'edition': 'United States patent · Cisco Technology · Issued 12 June 2007',
        'url': 'https://patentimages.storage.googleapis.com/92/d0/f6/43ee750455ca74/US7231530.pdf',
        'sha256': 'e6d1fc0a4748f1d98ae3ca1da22f8f8422dffb5f2afe72f6ad20ecb9d4feb22c',
        'sourceNote': PATENT_NOTE,
    },
    # Sol IP, US 9,900,067 B2 claim 38: the submitted chart's references.
    'broadcom-017': {
        'reference': 'Ref. 2',
        'title': 'Hansen, Moorti and Trachewsky, US 2006/0182017 A1',
        'edition': 'United States patent application publication · Compromise greenfield preambles for 802.11n · 17 August 2006',
        'url': 'https://patentimages.storage.googleapis.com/54/d9/00/e935141e38a0ad/US20060182017A1.pdf',
        'sha256': 'cc6e165b82443fa2c80310859d9ab0eb1834e07b150acdc3ff0a1bb2fcb5c0a7',
        'sourceNote': PATENT_NOTE,
    },
    'broadcom-870': {
        'reference': 'Ref. 3',
        'title': 'Kim, US 2008/0014870 A1',
        'edition': 'United States patent application publication · Explicit feedback with sounding packet · 17 January 2008',
        'url': 'https://patentimages.storage.googleapis.com/92/13/5b/e2b3ae539c5894/US20080014870A1.pdf',
        'sha256': '8249ebc9fabbf8e734efaf436cadc123315154fdbc23c967d35decc04f69a9dd',
        'sourceNote': PATENT_NOTE,
    },
    'airgo-474': {
        'reference': 'Ref. 6',
        'title': 'van Zelst, Jones and van Nee, US 2005/0286474 A1',
        'edition': 'United States patent application publication · Airgo Networks · 29 December 2005',
        'url': 'https://patentimages.storage.googleapis.com/2c/1c/0e/f3bc516e333d69/US20050286474A1.pdf',
        'sha256': '309a2c8ae54d3a2d48b30c493eb1f7947a7c870bd12e03b9d2fbedd352f0a37c',
        'sourceNote': PATENT_NOTE,
    },
    'intel-314': {
        'reference': 'Ref. 8',
        'title': 'Maheshwari, Boariu and Wei, US 2010/0008314 A1',
        'edition': 'United States patent application publication · Nokia Siemens Networks · 14 January 2010',
        'url': 'https://patentimages.storage.googleapis.com/16/77/ed/0102a198fd548b/US20100008314A1.pdf',
        'sha256': '71b2d6335954a9679a3c86558860aa589a6c2b99f60a5e9fc186a73a3e34ed0e',
        'sourceNote': PATENT_NOTE,
    },
    'ts25222': {
        'reference': 'Ref. 11',
        'title': '3GPP TS 25.222 V8.2.0, Multiplexing and channel coding (TDD)',
        'edition': 'Published by ETSI as ETSI TS 125 222 V8.2.0 · October 2008',
        'url': 'https://www.etsi.org/deliver/etsi_ts/125200_125299/125222/08.02.00_60/ts_125222v080200p.pdf',
        'sha256': '309048523c5967e49fb14fdac2f52901d7f67a3c94800f9ec9be4bb93810ec01',
        'sourceNote': 'Public copy of the specification as ETSI publishes it.',
    },
    'nec-050': {
        'reference': 'Ref. 13',
        'title': 'US 8,532,050 B2',
        'edition': 'United States patent · NEC · Issued 10 September 2013',
        'url': 'https://patentimages.storage.googleapis.com/ed/da/7c/47fee279caa662/US8532050.pdf',
        'sha256': '8b639195130f6dce135e4e6a99aa836b472aa451d0b189d5126fed01aedc9815',
        'sourceNote': PATENT_NOTE,
    },
    # CyboEnergy, US 9,331,489 B2 claim 14: the submitted chart's English references.
    'fornage-412': {
        'reference': 'Fornage',
        'title': 'Fornage, US 7,796,412 B2',
        'edition': 'United States patent · Enphase Energy · Issued 14 September 2010',
        'url': 'https://patentimages.storage.googleapis.com/25/22/da/27fe1dde3d7baa/US7796412.pdf',
        'sha256': '7c62ba923164bfb8fb4912a368e050bdc2328eb484673699c5081a685df65c3a',
        'sourceNote': PATENT_NOTE,
    },
    'muller-555': {
        'reference': 'Müller',
        'title': 'Müller, WO 2011/107555 A1 (SMA Solar Technology)',
        'edition': 'International application · Power inverter with multi-fed on-board power supply · Published 9 September 2011 · a scanned copy without a text layer',
        'url': 'https://patentimages.storage.googleapis.com/37/4e/ae/54955ecf82375b/WO2011107555A1.pdf',
        'sha256': '652837ee09569be975fd5593a602858d9dc3a70d5a8b3c170f3c38343d02c4a0',
        'sourceNote': PATENT_NOTE,
    },
    'suekane-344': {
        'reference': 'Suekane',
        'title': 'Suekane and Makitani, US 2011/0169344 A1',
        'edition': 'United States patent application publication · Utility interconnection and inverter device · 14 July 2011',
        'url': 'https://patentimages.storage.googleapis.com/08/fe/21/7a4cfcc39ec654/US20110169344A1.pdf',
        'sha256': 'f4ceb3891a61f09e9830a0cfd62bb99022a0d02a88d712140be385ff23afeeb9',
        'sourceNote': PATENT_NOTE,
    },
    # Arc Link, US 11,563,655 B2 claim 1: the submitted chart's printed publications.
    'ovx-ons14': {
        'reference': 'R1(b)',
        'title': 'OpenVirteX: A Network Hypervisor',
        'edition': 'Al-Shabibi et al. · Open Networking Summit 2014 · USENIX',
        'url': 'https://www.usenix.org/system/files/conference/ons2014/ons2014-paper-al_shabibi.pdf',
        'sha256': '16e95b0d6a96cdb7fafae4a10be7c13910e3ad56491ec44d1cb7d5d0b1a533f9',
        'sourceNote': 'Public copy of the paper as USENIX publishes it.',
    },
    'flo-v': {
        'reference': 'R1(e)',
        'title': 'Flo-v: Low Overhead Network Monitoring Framework in Virtualized Software Defined Networks',
        'edition': 'Yang, Lee, Jeong and Yoo · ACM CFI ’16, Nanjing, 15–17 June 2016 · Publisher’s copy',
        'archiveDate': '5 June 2020',
        'url': 'https://web.archive.org/web/20200605012653id_/https://dl.acm.org/doi/pdf/10.1145/2935663.2935677?download=true',
        'sha256': '1eb2a7b9febf6ce63fb32a6191c25a72dc819e951fb51ce7635197f6f975650d',
        'sourceNote': 'Archived 5 June 2020 from the publisher’s website. Printed pages 90–94.',
    },
    'skoldstrom': {
        'reference': 'R9',
        'title': 'Network Virtualization and Resource Allocation in OpenFlow-based Wide Area Networks',
        'edition': 'Sköldström and Yedavalli · IEEE ICC 2012, Ottawa, 10–15 June 2012 · Authors’ copy',
        'archiveDate': '21 April 2024',
        'url': 'https://web.archive.org/web/20240421163547id_/https://www.ericsson.com/4ac618/assets/local/reports-papers/research-papers/network-virtualization-and-resource-allocation-in-oenflow-based-wide-area-networks.pdf',
        'sha256': '55c3858510bf48dec169c4a0e0ab22ff98e4e86aa0c854aa7fc121b1b03db81a',
        'sourceNote': 'Authors’ copy, archived 21 April 2024 from the research-papers page of one author’s employer.',
    },
    # The backup grounds recorded beside the submitted charts. GridScale: grounds B to H.
    'liebert-235': {
        'reference': 'B',
        'title': 'Blair et al., US 7,453,235 B2',
        'edition': 'United States patent · Liebert Corporation · Issued 18 November 2008',
        'url': 'https://patentimages.storage.googleapis.com/d2/fb/3b/8ed0e68ac317a6/US7453235.pdf',
        'sha256': '1b3baeda973025df2096ba5e9c1e61e87957ec679482ba803c4c73550db3315e',
        'sourceNote': PATENT_NOTE,
    },
    'mitsubishi-987': {
        'reference': 'C',
        'title': 'Mitsubishi Electric, US 7,485,987 B2',
        'edition': 'United States patent · Issued 3 February 2009',
        'url': 'https://patentimages.storage.googleapis.com/d3/86/9f/eb8623797cf6b0/US7485987.pdf',
        'sha256': '33622746b5180c78a9d5a792ea0f2b7e58a776ffc81c7c6b0fe0a793ec3ad2ab',
        'sourceNote': PATENT_NOTE,
    },
    'abb-323': {
        'reference': 'C',
        'title': 'ABB, US 2011/0222323 A1',
        'edition': 'United States patent application publication · the national stage of WO 2009/087063 A1 · 15 September 2011',
        'url': 'https://patentimages.storage.googleapis.com/6b/4c/a7/94277c92066059/US20110222323A1.pdf',
        'sha256': 'e26978239fe0bf0e490304d1b9f4a558a91529da1369639410b2368cce8b5fec',
        'sourceNote': PATENT_NOTE,
    },
    'ge-271': {
        'reference': 'G',
        'title': 'Garces, Liu, deRooij and Bose, US 2010/0067271 A1',
        'edition': 'United States patent application publication · General Electric · 18 March 2010',
        'url': 'https://patentimages.storage.googleapis.com/96/de/27/a48bf4cde5ae13/US20100067271A1.pdf',
        'sha256': '3e489edd0a96e89c0ff3a6cc2aa5906fb40a97648843315f9dd89a8607721658',
        'sourceNote': PATENT_NOTE,
    },
    'abb-297': {
        'reference': 'E',
        'title': 'Stulz et al., US 7,499,297 B2',
        'edition': 'United States patent · ABB Schweiz · Issued 3 March 2009',
        'url': 'https://patentimages.storage.googleapis.com/9e/d9/c6/4b9eae7b1899dd/US7499297.pdf',
        'sha256': 'f8003643eebaff7b4053421f9eb58c88f6ca2786f24d65e584877c9e160c6335',
        'sourceNote': PATENT_NOTE,
    },
    'nippon-149': {
        'reference': 'F',
        'title': 'Mizuno, Takaesu and Ishii, JP 2006-320149 A',
        'edition': 'Japanese patent application publication · Nippon Oil · 24 November 2006 · Japanese original with the researcher’s translation',
        'url': 'https://patentimages.storage.googleapis.com/5f/9c/83/57399ac1a43633/JP2006320149A.pdf',
        'sha256': '6ac382e29c6c612c3e9bd69c0dcc8b2bf108e6315954dd0e59ddaccbefabefa0',
        'sourceNote': PATENT_NOTE,
    },
    'em-032': {
        'reference': 'H',
        'title': 'Peterson, US 6,850,032 B1',
        'edition': 'United States patent · E and M Power · Issued 1 February 2005',
        'url': 'https://patentimages.storage.googleapis.com/21/4d/06/ebf14c87b8bebb/US6850032.pdf',
        'sha256': '782b871ba65321d375ccd9041e6c1c3f963a5560db9123b5ae6e1dff59928041',
        'sourceNote': PATENT_NOTE,
    },
    # Sol IP '894: ground 2 and the window chart.
    'philips-319': {
        'reference': 'Ref. 3',
        'title': 'Husen, Serbetli and Wang, US 2011/0002319 A1',
        'edition': 'United States patent application publication · Koninklijke Philips Electronics · 6 January 2011',
        'url': 'https://patentimages.storage.googleapis.com/30/50/71/a20e1a5a86a206/US20110002319A1.pdf',
        'sha256': '0782a44c4e5d97a32a2bd987e4b7c33ea16a745a825ef44f01914a2adc7b854f',
        'sourceNote': PATENT_NOTE,
    },
    'ralink-232': {
        'reference': 'Window',
        'title': 'Ralink Technology, US 2011/0280232 A1',
        'edition': 'United States patent application publication · 17 November 2011',
        'url': 'https://patentimages.storage.googleapis.com/91/24/68/9fa681d0aa01a0/US20110280232A1.pdf',
        'sha256': '3ed92e3189eaece3c52dd15cd37f9db8a2c284f207675acbee571c05b613ced9',
        'sourceNote': PATENT_NOTE,
    },
    'liu-280': {
        'reference': 'Window',
        'title': 'Liu and Zhang, US 2011/0103280 A1',
        'edition': 'United States patent application publication · 5 May 2011',
        'url': 'https://patentimages.storage.googleapis.com/b2/83/f8/6df2aca3b3dbb5/US20110103280A1.pdf',
        'sha256': '34d03dda1ed48c08f311a210693c6abe31e8cd98eea466c4fb3b7b4bb7efa803',
        'sourceNote': PATENT_NOTE,
    },
    # Arc Link: the fallback ground's Nicira publication.
    'nicira-118': {
        'reference': 'R6',
        'title': 'Nicira, US 2015/0312118 A1',
        'edition': 'United States patent application publication · 29 October 2015',
        'url': 'https://patentimages.storage.googleapis.com/aa/c2/19/02077a5bc3f2da/US20150312118A1.pdf',
        'sha256': '36c366b6993f5cd4ae237e2e9f3b1469255a253b81830170c37c7f12a3e48659',
        'sourceNote': PATENT_NOTE,
    },
    # Nordic Unmanned: Wobben, for the European fallback.
    'wobben-910': {
        'reference': 'R6',
        'title': 'Wobben, US 2005/0061910 A1',
        'edition': 'United States patent application publication · Aircraft · 24 March 2005',
        'url': 'https://patentimages.storage.googleapis.com/a6/6c/17/d5d41326bbd45b/US20050061910A1.pdf',
        'sha256': '50352d684f5c2784543acaa520b6d884bb78e9878232be5e86fbbb914c568250',
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
    ('louvel-921', 1, 7, {
        'aircraft': 'The invention is an aircraft, remotely controlled',
        'powered': 'powered by propellers driven by electric motors, whose characteristics enable this device to perform',
        'propellers': 'the aircraft includes four propellers (10), (11), (12), (13) with vertical axis, that provides the lift thrust.',
        'independent': 'Each propeller is driven independently by an',
        'motor': 'The propeller (10) is driven by the motor (20).',
        'frame': 'The frame that bears the motors is made of two rectangular boards (30) and (31), arranged in a vertical plane and that intersect in the central part of the aircraft.',
    }),
    ('louvel-921', 2, 8, {
        'sensors': 'The aircraft is fitted with three attitude sensors whose purpose is to provide information for the closed loop control.',
        'boards': 'The board (30) bears the motors (10) and (12). The other board (31) bears the motors (11) and (13)',
    }),
    ('louvel-921', 3, 9, {
        'pwm': 'The function of the control unit (3) is to control the speed of each electric motor by adjusting the current in each of them by a pulse width modulation (PWM) current drive.',
    }),
    ('louvel-921', 4, 10, {
        'loop': 'When there is no action on the handle, the control loop uses the data coming from the various sensors (61), (62) and (63) to converge towards the horizontal normal attitude of the aircraft and to cancel the yaw movement.',
        'tilt': 'If the information supplied by the sensor (61) indicates that the aircraft is tilting towards the right side, then the correction consists in increasing the speed of the propeller 11, decreasing the speed of the propeller 13, meanwhile the speeds of the propellers 10 and 12 remain unchanged.',
    }),
    ('pauli-916', 'Publication page 2', 2, {
        'opposite': ('Der obere und untere Propeller werden zur gegengesetzten Rotation unabhängig voneinander durch entsprechende Triebwerke gebracht.',
                     'The upper and lower propellers are driven to opposite rotation, independently of each other, by respective engines.'),
    }),
    # GridScale's filed backup ground for 1a: the GE reference ([0002] is the span its OCR layer carries).
    ('ge-267', 'Publication page 8', 8, {
        'stages': 'Typical PV inverters employ two stages for power processing with the first stage configured for providing a constant DC voltage and the second stage configured for converting the constant DC voltage to AC current.',
    }),
    # Sol IP '894. The '800 publication's OCR layer capitalises some words and drops some spaces; spans avoid them.
    ('broadcom-800', 'Publication page 13', 13, {
        'radio': 'Radio, or station, 60 includes a host interface 62, a baseband processing module 64, memory 66, a plurality of radio frequency (RF) transmitters 68-72, a transmit/receive (T/R) module 74, a plurality of antennas 82-86',
        'memory': 'The memory 66 may be a single memory device or a plurality of memory devices.',
        'instructions': 'in combination with operational instructions',
        'functions': 'execute digital receiver functions and digital transmitter functions',
    }),
    ('broadcom-800', 'Publication page 16', 16, {
        'format': 'a legacy preamble 140, a signal field 142, an extended preamble 144, a plurality of additional signal fields 146, 150, 154, a plurality of data units (Service/PSDU) 148, 152',
        'first': 'The signal field 142 is further used to inform the newer devices (e.g., the IEEE 802.11n compliant devices) of the channel usage for 802.11n transmission and the number of transmit antennas for the transmission.',
        'additional': 'The additional signal fields 146, 150, 154 indicate the rate/mode, the length (in bytes) of the frame, the last PSDU in the frame (or burst), whether a PSDU immediate ACK is required, and error checking capabilities.',
        'symbols': 'The data portion 108 includes a plurality of data symbols 165, 167, 169 as previously described.',
        'bits': 'to convey the rate/mode (6 bits), length (12 bits), last PSDU (1 bit), immediate ACK (1 bit), CRC (4 bits), with 2-6 bits reserved',
    }),
    ('cisco-530', 'Columns 5–6', 13, {
        'psdu': 'The remainder of the modulated payload, called the PLCP Service Data Unit (PSDU)',
    }),
    ('cisco-530', 'Columns 9–10', 15, {
        'crc': 'the integrity of at least one bit of the PLCP header, e.g., the SIGNAL field, is verified using a polynomial (CRC) check sequence located in at least one bit of the SERVICE field.',
    }),
    # Sol IP '067.
    ('broadcom-017', 'Publication page 15', 15, {
        'transceiver': 'FIG. 2a is an exemplary block diagram of a transceiver which may be utilized in accordance with an embodiment of the invention.',
        'processor': 'The transceiver 274 may comprise a processor 282, a receiver 284, and a transmitter 286.',
    }),
    ('broadcom-017', 'Publication page 18', 18, {
        'preamble': 'The preamble and header 402 may comprise a legacy short training field (L-STF) 404, a legacy long training field (L-LTF) 406, a legacy signal field (L-SIG) 408, a high throughput signal field (HT-SIG) 410',
    }),
    ('broadcom-870', 'Publication page 16', 16, {
        'memory': 'The memory 272 may comprise suitable logic, circuitry, and/or code that may be utilized to enable storage and/or retrieval of data and/or code.',
    }),
    ('airgo-474', 'Publication page 16', 16, {
        'siso': '2) Extended SISO in multiple 20 MHz channels (e.g., 40, 60, 80, or 100 MHz channels)',
    }),
    ('airgo-474', 'Publication page 18', 18, {
        'copy': 'the transmitter transmits an identical copy of the preamble and signal field in each 20 MHz channel used by that transmitter',
    }),
    ('airgo-474', 'Publication page 21', 21, {
        'legacy': 'in combination form a legacy 802.11a/g preamble portion',
    }),
    ('airgo-474', 'Publication page 22', 22, {
        'bits': 'Signal field 1600 includes 48 bits, of which 6 bits are used to indicate the mode, 16 bits are used to indicate the length, 16 bits are used for CRC for error checking, 1 bit is used to indicate the last PSDU of frame',
        'reserved': '1 bit is used to indicate the last PSDU of frame, 3 bits are reserved bits, and 6 bits are set to zero',
        'tail': '3 bits are reserved bits, and 6 bits are set to zero to allow the convolutional encoder as specified in the 802.11a standard to return to the zero state.',
    }),
    ('intel-314', 'Publication page 15', 15, {
        'select': 'the size of the burst length field 404 may be selected by determining the frequency or bandwidth used for communication with the MS.',
        'savings': 'a minimum of 8 bits is needed to represent all possible available 192 resource blocks (a savings of 2 bits compared to the 802.16e 10 bit reference).',
    }),
    ('ts25222', 62, 63, {
        'tbs': 'Transport-block size information (m bits where m = 6 for 1.28 Mcps TDD and m = 9 for 3.84 Mcps TDD / 7.68Mcps TDD):',
    }),
    ('nec-050', 'Columns 15–16', 20, {
        'estimate': 'Thus, by using this encoding technique, the theoretical minimum number of bits required for signalling a contiguous resource allocation can be estimated for different bandwidths as follows (where each frequency block is assumed to be 20 MHz):',
    }),
    # CyboEnergy '489 (the Japanese primary, Morishima, has no public copy; Müller's WO is a scan without a text layer).
    ('fornage-412', 'Columns 5–6', 12, {
        'threshold': 'At step 604, the method 600 performs calculations and checks if the input power is greater than a power threshold.',
        'microcontroller': 'those skilled in the art will realize that a microprocessor or microcontroller may also be used to generate the control signals in view of the DC current, DC voltage and AC phase.',
    }),
    ('muller-555', 10, 11, {
        'links': 'The on-board supply unit 14 takes electric energy both out of the DC voltage link 10 and the DC voltage link 6.',
        'controller': 'The on-board voltage rails 15 particularly serve for supplying electric energy to a controller 60 of the inverter 1',
    }),
    ('suekane-344', 'Publication page 6', 6, {
        'night': 'when it becomes less than the night time decision value, then power is supplied from the solar panel to the power circuit',
    }),
    ('suekane-344', 'Publication page 8', 8, {
        'calculates': 'calculates the DC power from the DC voltage and the DC current that have been detected',
    }),
    ('suekane-344', 'Publication page 12', 12, {
        'switch': 'changes over the first switch from closed to open, when the power detected by the power detection unit becomes less than a night time decision value for deciding that it is night time',
    }),
    # Arc Link.
    ('ovx-ons14', 1, 1, {
        'hypervisor': 'Here we present OpenVirteX, a network hypervisor that enables operators to provide this form of network virtualization to their customers.',
    }),
    ('flo-v', 90, 1, {
        'request': 'a network hypervisor provides the controller with translated monitoring information',
        'role': 'a network hypervisor plays a key role in',
    }),
    ('flo-v', 92, 3, {
        'replier': 'Flo-v’s statistics replier determines the corresponding physical switches',
    }),
    ('skoldstrom', 1, 1, {
        'translation': 'Essential to the virtualization process is a translation unit that maps identifiers between the real physical network and the virtual ones, similar to a memory management unit in a computer or one of many kinds of hypervisors used on virtual machine hosts.',
    }),
    ('skoldstrom', 2, 2, {
        'shared': 'With encapsulation, each VN in the network is assigned a link-local encapsulation ID, called a Virtual Network ID (VNID), a MPLS label for example, to which the VN traffic will be mapped and encapsulated when it traverses a shared link.',
    }),
    ('skoldstrom', 5, 5, {
        'counters': 'For example, for statistics monitoring, per-VN port counters could be implemented through per-VN FlowTable entries [15].',
    }),
    # The backup grounds. The Google Patents text layers are OCR of the prints (dropped hyphens, some
    # capitalised words), so each quote is a contiguous span the layer carries.
    ('liebert-235', 'Columns 1–2', 24, {
        'modular': 'The modular design provides expandability and redundancy. Frame 1 can accommodate multiple power modules.',
    }),
    ('liebert-235', 'Columns 3–4', 25, {
        'modules': 'The power modules 4 receive AC power from the utility input 7 and convert it to DC power, which is used to charge the batteries',
    }),
    ('liebert-235', 'Columns 5–6', 26, {
        'controller': 'The power module control system is schematically depicted in FIG. 4. The primary control element is controller 100',
    }),
    ('liebert-235', 'Columns 7–8', 27, {
        'power': 'then determines the appropriate output per module and sends instructions to modules, which adjust their individual outputs accordingly.',
    }),
    ('mitsubishi-987', 'Columns 3–4', 18, {
        'supply': 'The single-phase inverters 4 each have an independent DC power supply 6 and output terminals 91, 92 from which a voltage of the DC power supply 6 is output during a desired period of time',
    }),
    ('mitsubishi-987', 'Columns 13–14', 23, {
        'inverter': 'a power converting device of a third embodiment described below is used as a system interconnection inverter for converting DC power fed from a DC power source into AC power and thereby connecting the DC power source to a power system.',
        'cpu': 'designated by the numeral 10 is a CPU, and designated by the numeral 60a are peripheral circuits of the CPU 10.',
    }),
    ('abb-323', 'Publication page 7', 7, {
        'distributed': 'The basic principle of this control method is to perform switching of the submodules according to a pulsewidth modulation (PWM) in a distributed manner rather than in a centralized manner',
    }),
    ('ge-271', 'Publication page 6', 6, {
        'system': 'FIG. 1 illustrates one embodiment of a distributed solar power generation system according to an aspect of the present technique.',
        'modules': 'In the illustrated embodiment, the inverters 14 and 16 are coupled together to form a first phase A (18), a second phase B (20), and a third phase C (22).',
        'sensing': 'In another embodiment, the sensing device 34 may be a current transformer configured to sense overall load current from all three phases at node 24.',
        'pwm': 'Further, inverters may include pulse width modulators and control circuitry configured to receive reactive power commands.',
        'coupled': 'the optimization controller 36 may be individually coupled to each of the inverters (14, 16, and 28).',
    }),
    ('abb-297', 'Columns 1–2', 10, {
        'field': 'Polyphase converter circuits relating to the field of power electronics are disclosed.',
    }),
    ('abb-297', 'Columns 3–4', 11, {
        'element': 'each converter circuit element 1 having a rectifier unit 2, a DC voltage circuit 3 which is connected to the rectifier unit 2 and an inverter unit 4',
    }),
    ('abb-297', 'Columns 7–8', 13, {
        'higher': 'Furthermore, a higher-order controller unit 21 is provided which is connected to each local controller unit 20.',
        'local': 'In the exemplary converter circuit shown in FIG. 3, each inverter unit 4 has an associated local controller unit 20, drivable power semiconductor switches S1, S2, S3, S4, S5, S6 of the inverter unit 4 being connected to the associated local controller unit 20.',
    }),
    # Nippon Oil: the page's own full-width text; a line break inside a quote is given as one space.
    ('nippon-149', 'Publication page 2', 2, {
        'claim': ('分散電源からの電力を受けて交流電力を出力する複数のパワーコンディショナと', 'a plurality of power conditioners that receive power from distributed power sources and output AC power'),
    }),
    ('nippon-149', 'Publication page 5', 5, {
        'communication': ('通信部４０は、受信した制御信号をコントローラ２５ に転送し、コントローラ２５から受け取った状態信号をマスタコントローラ３２に送信す る。', 'The communication unit 40 transfers the received control signal to the controller 25 and sends the status signal received from the controller 25 to the master controller 32.'),
    }),
    ('nippon-149', 'Publication page 6', 6, {
        'master': ('マスタコントローラ３２は、並列接続点Ａと配電盤１３との間の交流電力線３４での各 線間の電圧を計測する電圧センサ４１と、交流電力線３４の各線に流れる電流を計測する 電流センサ４２と', 'The master controller 32 has a voltage sensor 41 that measures the voltage between the lines of the AC power line 34 between the parallel connection point A and the switchboard 13, a current sensor 42 that measures the current flowing in each line of the AC power line 34'),
    }),
    ('em-032', 'Columns 7–8', 21, {
        'system': 'The generator system 100 preferably includes a polyphase machine 102, such as a PMA, a polyphase inverter 104, a plurality of single-phase inverters 106A, 106B, and 106C',
    }),
    ('em-032', 'Columns 11–12', 23, {
        'inputs': 'signals indicative of the respective voltages across the shunt capacitors (C) of the single-phase inverters 106A, 106B, and 106C and across the shunt capacitors (C) of the polyphase inverter 104 (these signals are collectively labeled Vout)',
    }),
    ('em-032', 'Columns 15–16', 25, {
        'command': 'The command signal Cmd3 (which is utilized to control the polyphase inverter 104)',
    }),
    # Sol IP '894.
    ('philips-319', 'Publication page 7', 7, {
        'common': 'information relevant for all receivers',
        'amount': 'the amount of the user data transmitted in the stream',
    }),
    ('philips-319', 'Publication page 8', 8, {
        'user': 'user-stream specific settings and may be different for each user (receiver)',
        'sequential': 'The above fields can be transmitted sequentially over the channel.',
        'training': 'A MU training field 140',
        'after': 'can happen only after the MU training field 140',
        'streams': 'The number of USERSIG fields 150 is dependent on the number of spatial streams 160 (USER1 to USERn data) in the MU-MIMO transmissions.',
    }),
    ('ralink-232', 'Publication page 11', 11, {
        'order': 'Arrange the L-TF field, the L-SIG field, the first VHT-SIG field, the VHT-STF field, the at least one VHT-LTF field and the second VHT-SIG field sequentially.',
        'length': 'the length information, the CRC check, or tail bits',
    }),
    ('liu-280', 'Publication page 21', 21, {
        'specific': 'the VHT-SIGB 80 includes information specific to a client station',
    }),
    ('liu-280', 'Publication page 24', 24, {
        'verification': 'so that a receiving device can check whether a scrambler seed 304 also included in the service field 300 is correct',
    }),
    # Arc Link.
    ('nicira-118', 'Publication page 25', 25, {
        'exporters': 'statistics relating to one logical port can come from two flow stats exporters 125 and 130 on the two separate PFEs 115 and 120',
    }),
    # Nordic Unmanned.
    ('wobben-910', 'Publication page 4', 4, {
        'control': 'the aircraft according to the invention has a device for automatic control of the flight attitude and/or the flight altitude.',
    }),
    ('wobben-910', 'Publication page 5', 5, {
        'inverter': 'Associated with each motor 10 is an inverter 14 which permits individual actuation of each motor 10.',
    }),
    ('spirov-357', 9, 10, {
        'hover': 'The hover control system uses an XYZ sensor arrangement and associated control circuitry that dynamically determines an inertial gravitational reference for use in automatically and continuously determine the speed needed for each fan in order to keep the craft at a desired orientation.',
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
