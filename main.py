# Copyright (C) 2017-2025, Stefan Kloppenborg
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

from gevent import monkey
monkey.patch_all()
import bottle
from bottle import request, response, route, static_file
from bottle import post, get, put, delete
import configparser
import datetime
import fnmatch
import json
import os
import os.path
import pathlib
import mimetypes
import zipfile
import sys

app = application = bottle.default_app()

HOST = "127.0.0.1"
PORT = 5032
LOCAL_LIBRARY_FILES = "./library/files"
LOCAL_JSON = "./library/MyLibrary.json"
LOCAL_ARCHIVE = "./library/archive"
REMOTE_JSON = "./remote/remote.json"
REMOTE_ARCHIVE = "./remote/remote_archive"

referenceFields = []  ## Will be read-in in __main__ function


@app.hook('after_request')
def enable_cors():
    """
    You need to add some headers to each request.
    Don't use the wildcard '*' for Access-Control-Allow-Origin in production.
    """
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, PATCH, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Content-Length, X-Requested-With, X-CSRF-Token'


@route('/', method='OPTIONS')
@route('/<path:path>', method='OPTIONS')
def options_handler(path=None):
    response.status = 200
    return


@route("")
@route("/")
def index():
    return static_file("index.html", root="./build")


@route("/<filename>")
def send_static(filename):
    return static_file(filename, root="./build")


@route("/static/<filename:path>")
def send_static_static(filename):
    return static_file(filename, root="./build/static")


@route("/library/files<filename:path>")
def send_file(filename):
    return static_file(filename, root=LOCAL_LIBRARY_FILES)


def get_file_contents(path: str) -> str:
    """
    Gets the contents of a file on disk
    :param path: The path to the file, including the extension
    :return: A string with the file contents
    """
    try:
        with open(path, "r", encoding="UTF-8") as fc:
            return fc.read()
    except IOError:
        response.status = 400
        return ""


@route("/local-files<filename:path>")
def send_local_file(filename):
    return static_file(filename, root="/")


@get("/api/library")
def get_library() -> str:
    """
    Gets the JSON object representing the library stored on disk
    :return: A JSON-formatted string
    """
    return get_file_contents(LOCAL_JSON)


def update_library_item_pure(old_id: str, updated_ref: dict, cur_library: list) -> list:
    """
    A pure function for updating/adding a library item. This facilitates unit testing
    :param old_id: the "old" id for the item (ie. it may have changed)
    :param updated_ref: the new version of the reference
    :param cur_library: the current library
    :return: the updated library
    """
    updated_library = list(cur_library)
    if sum([1 for r in updated_library if r["id"] == old_id]) > 0:
        #  found the id, so update
        for i, item in enumerate(updated_library):
            if item["id"] == old_id:
                updated_library[i] = updated_ref
    else:
        # didn't find the id, so insert
        updated_library.append(updated_ref)
    return updated_library


@put("/api/library/<old_id:path>")
def update_library_item(old_id: str):
    """
    Updates a library item, if it exists; otherwise, creates it

    :param old_id: The "old" id for the item (ie. if it has changed, what was it previously identified as)
    :return:
    """
    cur_lib_str = get_library()
    cur_lib = json.loads(cur_lib_str)
    updated_ref = json.loads(str(request.body.read(), "UTF-8"))
    updated_lib = update_library_item_pure(old_id, updated_ref, cur_lib)
    with open(LOCAL_JSON, "w", encoding="UTF-8") as f:
        f.write(json.dumps(updated_lib, indent=2, ensure_ascii=False))


@get("/api/filepath")
def get_filepath() -> str:
    """
    Gets the path to prepend on links to reference attachments. Includes http:/// at the beginning and no trailing slash
    :return: A string representing the path
    """
    return f"http://{HOST}:{PORT}/library"


@get("/api/local-filepath")
def get_localfilepath() -> str:
    """
    Gets the path to prepend on links to reference local files. Includes http:/// at the beginning and no trailing slash
    :return: A string representing the path
    """
    return f"http://{HOST}:{PORT}/local-files"


def get_directory_listing(directory: str, ext: str) -> str:
    """
    Gets a listing of all files with the extension ext in the directory dir
    :param directory: The directory
    :param ext: The extension (including the .)
    :return: A JSON-formatted string (a list in JSON)
    """
    dir_list = os.listdir(directory)
    dir_list = [f.split(ext)[0] for f in dir_list if f.endswith(ext)]
    dir_list.sort()
    return json.dumps(dir_list)


@get("/api/csl-styles")
def get_csl_styles_listing() -> str:
    """
    Gets a listing of all available CSL styles
    :return: A JSON-formatted string (a list in JSON)
    """
    return get_directory_listing("csl-styles", ".csl")


@get("/api/csl-styles/<name>")
def get_csl_style(name) -> str:
    """
    Gets a particular CSL style.
    :param name: the name of the CSL style to retrieve. Does not include .csl extension
    :return: An XML object
    """
    return get_file_contents(os.path.join("csl-styles", "{}.csl".format(name)))


@get("/api/csl-locales")
def get_csl_locales_listing() -> str:
    """
    Gets a listing of all available CSL locales
    :return: A JSON-formatted string (a list in JSON)
    """
    return get_directory_listing("csl-locales", ".xml")


@get("/api/csl-locales/<name>")
def get_csl_locale(name) -> str:
    """
    Gets a particular CSL locale
    :param name: the name of the CSL locale to retrieve. Does not include .xml extension
    :return: An XML object
    """
    return get_file_contents(os.path.join("csl-locales", "{}.xml".format(name)))


def get_library_referenced_files():
    """
    Returns a list of all files referenced in the library

    The files in the "file" entry in the reference is assumed to be a semicolon separated lists of items with the format
    of <filename>:<path>:<mime-type> or of the format <path>
    :return: a list of files from the library
    """
    library_str = get_library()
    library = json.loads(library_str)
    for reference in library:
        if "file" in reference:
            for file_str in reference["file"].split(";"):
                if ":" in file_str:
                    yield file_str.split(":")[1]
                else:
                    yield file_str


def get_file_list(unlinked: bool) -> list:
    """
    Gets a listing of all the files on disk that could be linked to a reference
    :param unlinked: (bool) whether to only show the files that are not currently linked to a reference
    :return: a list of dicts. Each dict has {file_name, path, mime_type}
    """
    library_root = os.path.dirname(os.path.realpath(__file__))
    library_root = os.path.join(library_root, "library")
    files_root = os.path.join(library_root, "files")

    file_list = [
        {
            "file_name": f,
            "path": str(pathlib.PurePosixPath(pathlib.Path(os.path.join(dir_path, f)).relative_to(library_root))),
            "mime_type": mimetypes.guess_type(os.path.join(dir_path, f))[0]
        }
        for dir_path, dir_names, file_names in os.walk(files_root) for f in file_names]

    if not unlinked:
        return file_list

    referenced_files = [os.path.normpath(f) for f in get_library_referenced_files()]

    return [f for f in file_list if os.path.normpath(f["path"]) not in referenced_files]


@get("/api/files")
def get_file_list_handler():
    """
    Gets a list of all the files available for linking to references.

    If the url argument "unlinked" is specified, only the files that have not previously been linked to a reference
    are shown.

    The JSON-formatted list that is returned is a list of dicts. Each dict has three keys: file_name, path and mime_type

    :return: A JSON-formatted list
    """
    file_list = get_file_list("unlinked" in request.params.dict)
    file_list.sort(key=lambda f: f["path"])
    return json.dumps(file_list)


@get("/api/dead-links")
def get_dead_links():
    if pathlib.Path("deadlinkignore.local").is_file():
        with open("deadlinkignore.local", "r", encoding="UTF-8") as file:
            ignore = [line.rstrip() for line in file]
    else:
        ignore = []

    ref_files = get_library_referenced_files()
    ref_files = set(ref_files)
    disk_files = get_file_list(False)
    disk_files = set([df["path"] for df in disk_files])
    dead_links = ref_files.difference(disk_files)

    dead_links = [f for f
                  in list(dead_links)
                  if not any([fnmatch.fnmatch(f, ig) for ig in ignore])
                  ]

    return json.dumps(list(dead_links))


def find_item(library, id):
    for li in library:
        if id == li["id"]:
            return li
    return {}


def diff_items(local, remote):
    diff = {}
    referenceFieldNames = list([item["field"] for item in referenceFields])
    for kl, vl in local.items():
        if kl in remote:
            remote_val = remote[kl]
        else:
            remote_val = None if kl != "id" else vl
        is_different = (vl != remote_val) and (kl in referenceFieldNames)
        # ^^ Sometimes, especially if a reference has been imported, there is an unrecognized field.
        #    If that field is included in the diff, the "different" reference will show up, but no
        #    fields will show as different. This is very confusing to the user.
        diff[kl] = {
            "local": vl,
            "remote": remote_val,
            "is_different": is_different,
            "use": ""
        }
    for kr, vr in remote.items():
        if kr not in diff:
            local_val = None if kr != "id" else vr
            is_different = vr != local_val and (kl in referenceFieldNames)
            diff[kr] = {
                "local": local_val,
                "remote": vr,
                "is_different": is_different,
                "use": ""
            }
    return diff


def is_diff_different(diff):
    return any([diff[v]["is_different"] for v in diff])


@get("/api/diff")
def get_diff():
    local_str = get_file_contents(LOCAL_JSON)
    remote_str = get_file_contents(REMOTE_JSON)
    local = json.loads(local_str)
    remote = json.loads(remote_str)

    diff = []
    for local_item in local:
        remote_item = find_item(remote, local_item["id"])
        curr_diff = diff_items(local_item, remote_item)
        if is_diff_different(curr_diff):
            diff.append(curr_diff)
    for remote_item in remote:
        local_item = find_item(local, remote_item["id"])
        if len(local_item.keys()) == 0:
            diff.append(diff_items(local_item, remote_item))
    return json.dumps(diff)


def update_field(library, id, field, value):
    updated_library = list(library)
    if sum([1 for r in updated_library if r["id"] == id]) > 0:
        #  found the id, so update
        for i, item in enumerate(updated_library):
            if item["id"] == id:
                updated_library[i][field] = value
    else:
        # didn't find the id, so insert
        updated_library.append({
            "id": id,
            field: value
        })
    return updated_library


def save_diff_to_disk(library, library_json_path, archive):
    timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    with zipfile.ZipFile(os.path.join(archive, f"archive{timestamp}.zip"),
                         "w", zipfile.ZIP_DEFLATED) as zip:
        zip.write(library_json_path)
    with open(library_json_path, "w", encoding="UTF-8") as f:
        f.write(json.dumps(library, indent=2, ensure_ascii=False))


@put("/api/save-diff")
def save_diff():
    diff = json.loads(str(request.body.read(), "UTF-8"))

    local_library = get_file_contents(LOCAL_JSON)
    local_library = json.loads(str(local_library))
    remote_library = get_file_contents(REMOTE_JSON)
    remote_library = json.loads(str(remote_library))
    local_modified = False
    remote_modified = False

    for diff_item in diff:
        cur_id = diff_item["id"]["local"] if diff_item["id"]["remote"] == "" \
            else diff_item["id"]["remote"]
        for k, v in diff_item.items():
            if k != "id":
                if v["use"] == "local":
                    remote_library = update_field(
                        remote_library,
                        cur_id,
                        k,
                        v["local"])
                    remote_modified = True
                if v["use"] == "remote":
                    local_library = update_field(
                        local_library,
                        cur_id,
                        k,
                        v["remote"]
                    )
                    local_modified = True
    
    if local_modified:
        save_diff_to_disk(local_library, LOCAL_JSON, LOCAL_ARCHIVE)

    if remote_modified:
        save_diff_to_disk(remote_library, REMOTE_JSON, REMOTE_ARCHIVE)


if __name__ == "__main__":
    try:
        allowed_vars = ["LOCAL_LIBRARY_FILES", "LOCAL_JSON", "LOCAL_ARCHIVE",
                        "REMOTE_JSON", "REMOTE_ARCHIVE"]
        config = configparser.ConfigParser()
        if os.path.isfile("config.ini"):
            config.read("config.ini")
            module = sys.modules[__name__]
            for setting in config["DEFAULT"]:
                if hasattr(module, setting.upper()) and setting.upper() in allowed_vars:
                    setattr(module, setting.upper(), config["DEFAULT"][setting])

    except:
        print("An error occured when reading `config.ini`")
    with open("src/referenceFields.json", "r", encoding='UTF-8') as file:
        referenceFields = json.load(file)
    bottle.run(app, host=HOST, port=PORT, server='gevent')
