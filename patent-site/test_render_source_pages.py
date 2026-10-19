"""Locating a quotation on a page (render-source-pages.py's OCR path and its word fallback) and reading a case copy.

Run with the Python that runs the renderer (PyMuPDF and Tesseract installed):
python -m unittest discover -s patent-site -p 'test_*.py'
"""
import hashlib
import importlib.util
from pathlib import Path
import tempfile
import unittest

import fitz

spec = importlib.util.spec_from_file_location('render_source_pages', Path(__file__).resolve().parent / 'render-source-pages.py')
renderer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(renderer)

PRINTED = ('In an alternate embodiment that provides for more efficiency, each of the\n'
           'ducted fans has two counter-rotating multi-bladed units.')


def scanned_page(text):
    """A page whose only content is an image of the text, as on a scanned patent copy."""
    source = fitz.open()
    source.new_page(width=595, height=842).insert_text((60, 120), text, fontsize=13)
    image = source[0].get_pixmap(matrix=fitz.Matrix(200 / 72, 200 / 72), alpha=False)
    document = fitz.open()
    page = document.new_page(width=595, height=842)
    page.insert_image(page.rect, pixmap=image)
    return document, page


class OcrLocator(unittest.TestCase):
    def test_places_a_scanned_quotation_line_by_line_despite_a_word_ocr_did_not_read(self):
        document, page = scanned_page(PRINTED)
        self.assertEqual(page.get_text().strip(), '')
        # The recorded quote carries the reference numeral "40", which this page does not print.
        quote = 'In an alternate embodiment that provides for more efficiency, each of the ducted fans 40 has two counter-rotating multi-bladed units.'
        rectangles = renderer.locate_in_ocr_words(renderer.ocr_words(page), quote, 'test-1')
        self.assertEqual(len(rectangles), 2)
        first, second = rectangles
        self.assertLess(first.y1, second.y0)
        for rectangle in rectangles:
            self.assertTrue(page.rect.contains(rectangle) and rectangle.width > 100)

    def test_raises_when_a_quotation_is_not_on_a_page_without_a_text_layer(self):
        document, page = scanned_page(PRINTED)
        with self.assertRaises(ValueError) as raised:
            renderer.locate_in_ocr_words(renderer.ocr_words(page), 'The hover control system uses an XYZ sensor arrangement.', 'test-1')
        self.assertTrue(str(raised.exception).startswith('Quotation not found by OCR on test-1'))


class TextLayerLocator(unittest.TestCase):
    def test_places_a_quotation_the_text_search_misses_at_a_hyphenated_line_break(self):
        document = fitz.open()
        page = document.new_page(width=595, height=842)
        page.insert_text((60, 120), 'OpenVirteX is a network hypervisor that can create multiple vir-\ntual and programmable networks on top of a single physical one.', fontsize=11)
        quote = 'create multiple virtual and programmable networks'
        self.assertEqual(page.search_for(quote, flags=fitz.TEXT_DEHYPHENATE), [])
        rectangles = renderer.locate_in_words(page, quote, 'test-1')
        self.assertEqual(len(rectangles), 2)
        first, second = rectangles
        self.assertLess(first.y1, second.y0 + 1)
        self.assertGreater(first.x0, 200)  # starts at "create", not at the start of the line

    def test_raises_when_a_quotation_is_not_in_the_page_words(self):
        document = fitz.open()
        page = document.new_page(width=595, height=842)
        page.insert_text((60, 120), 'OpenVirteX is a network hypervisor.', fontsize=11)
        with self.assertRaises(ValueError) as raised:
            renderer.locate_in_words(page, 'a slicing proxy', 'test-1')
        self.assertTrue(str(raised.exception).startswith('Quotation not found on test-1'))


class HeldCopy(unittest.TestCase):
    def test_refuses_a_case_copy_whose_bytes_do_not_match_the_exhibit(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            path = root / renderer.HELD_COPIES['ovx-hotsdn']
            path.parent.mkdir(parents=True)
            path.write_bytes(b'%PDF-1.4 not the exhibit')
            with self.assertRaises(ValueError) as raised:
                renderer.held_copy(root, 'ovx-hotsdn', renderer.DOCUMENTS['ovx-hotsdn'])
            self.assertIn('does not match its exhibit', str(raised.exception))
            metadata = dict(renderer.DOCUMENTS['ovx-hotsdn'], sha256=hashlib.sha256(path.read_bytes()).hexdigest())
            self.assertEqual(renderer.held_copy(root, 'ovx-hotsdn', metadata), b'%PDF-1.4 not the exhibit')


if __name__ == '__main__':
    unittest.main()
