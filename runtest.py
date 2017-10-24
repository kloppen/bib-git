import unittest
import main
import json
import xml.etree.ElementTree


class TestBottleApp(unittest.TestCase):
    def test_get_library(self):
        resp = main.get_library()
        # Should be a JSON object (ie. this shouldn't fail)
        json_resp = json.loads(resp)
        # should be a list
        self.assertTrue(type(json_resp) is list)

    def test_get_filepath(self):
        resp = main.get_filepath()
        self.assertTrue(type(resp) is str)
        self.assertTrue(resp.startswith("file:///"))  # three slashes, even for windows
        self.assertFalse(resp.endswith("/"))

    def test_get_csl_styles_listing(self):
        resp = main.get_csl_styles_listing()
        self.assertTrue(type(resp) is str)
        json_resp = json.loads(resp)
        self.assertTrue(type(json_resp) is list)

    def test_get_csl_style(self):
        resp = main.get_csl_style("ieee")
        self.assertTrue(type(resp) is str)
        xml_resp = xml.etree.ElementTree.fromstring(resp)
        self.assertIsNotNone(xml_resp)
        resp = main.get_csl_style("something-that-does-not-exist")
        self.assertNotEqual(main.response, 200)


if __name__ == "__main__":
    unittest.main()
