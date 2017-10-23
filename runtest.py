import unittest
import main
import json


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


if __name__ == "__main__":
    unittest.main()
