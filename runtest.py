# Copyright (C) 2017, Stefan Kloppenborg
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

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

    def test_get_csl_locales_listing(self):
        resp = main.get_csl_locales_listing()
        self.assertTrue(type(resp) is str)
        json_resp = json.loads(resp)
        self.assertTrue(type(json_resp) is list)

    def test_get_csl_locale(self):
        resp = main.get_csl_locale("locales-en-US")
        self.assertTrue(type(resp) is str)
        xml_resp = xml.etree.ElementTree.fromstring(resp)
        self.assertIsNotNone(xml_resp)
        resp = main.get_csl_style("something-that-does-not-exist")
        self.assertNotEqual(main.response, 200)

    def test_update_reference(self):
        res = main.update_library_item_pure(
            old_id="id1",
            updated_ref={"id": "id1_new", "title": "title1_new"},
            cur_library=[
                {"id": "id1", "title": "title1"},
                {"id": "id2", "title": "title2"}
            ]
        )
        self.assertListEqual(
            res,
            [
                {"id": "id1_new", "title": "title1_new"},
                {"id": "id2", "title": "title2"}
            ]
        )

    def test_insert_reference(self):
        res = main.update_library_item_pure(
            old_id="id3",
            updated_ref={"id": "id3", "title": "title3"},
            cur_library=[
                {"id": "id1", "title": "title1"},
                {"id": "id2", "title": "title2"}
            ]
        )
        self.assertListEqual(
            res,
            [
                {"id": "id1", "title": "title1"},
                {"id": "id2", "title": "title2"},
                {"id": "id3", "title": "title3"}
            ]
        )

    def test_get_file_list(self):
        res = main.get_file_list(True)
        self.assertTrue(type(res) is list)
        # check that the dict has the correct keys
        self.assertTrue("file_name" in res[0])
        self.assertTrue("path" in res[0])
        self.assertTrue("mime_type" in res[0])
        count_unlinked = len(res)

        res = main.get_file_list(False)
        self.assertTrue(type(res) is list)
        # check that the dict has the correct keys
        self.assertTrue("file_name" in res[0])
        self.assertTrue("path" in res[0])
        self.assertTrue("mime_type" in res[0])
        count_all = len(res)
        self.assertGreater(count_all, count_unlinked)  # this will fail if no references in library are linked


if __name__ == "__main__":
    unittest.main()
