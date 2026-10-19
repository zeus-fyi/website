"""Locating a quotation on a page without a text layer (render-source-pages.py's OCR path).

Run with the Python that runs the renderer (PyMuPDF and Tesseract installed):
python -m unittest discover -s patent-site -p 'test_*.py'
"""
import importlib.util
from pathlib import Path
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


if __name__ == '__main__':
    unittest.main()
