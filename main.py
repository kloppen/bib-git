import bottle
from bottle import request, response, route
from bottle import post, get, put, delete
import json
import os
import os.path
import pathlib
import mimetypes

app = application = bottle.default_app()


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


def get_file_contents(directory: str, file: str) -> str:
    """
    Gets the contents of a file on disk
    :param directory: The directory in which the file is
    :param file: The name of the file, including the extension
    :return: A string with the file contents
    """
    path = os.path.join(directory, file)
    try:
        with open(path, "r") as fc:
            return fc.read()
    except IOError:
        response.status = 400
        return ""


@get("/api/library")
def get_library() -> str:
    """
    Gets the JSON object representing the library stored on disk
    :return: A JSON-formatted string
    """
    return get_file_contents("library", "MyLibrary.json")


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
    with open(os.path.join("library", "MyLibrary.json"), "w") as f:
        f.write(json.dumps(updated_lib, indent=2, ensure_ascii=False))


@get("/api/filepath")
def get_filepath() -> str:
    """
    Gets the path to prepend on links to reference attachments. Includes file:/// at the beginning and no trailing slash
    :return: A string representing the path
    """
    dir_path = os.path.dirname(os.path.realpath(__file__))
    dir_path = os.path.join(dir_path, "library")
    return pathlib.Path(dir_path).as_uri()


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
    return get_file_contents("csl-styles", "{}.csl".format(name))


@get("/api/csl-locales")
def get_csl_locales_listing() -> str:
    """
    Gets a listinf of all available CSL locales
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
    return get_file_contents("csl-locales", "{}.xml".format(name))


def get_library_referenced_files() -> list:
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
            "path": str(pathlib.Path(os.path.join(dir_path, f)).relative_to(library_root)),
            "mime_type": mimetypes.guess_type(os.path.join(dir_path, f))[0]
        }
        for dir_path, dir_names, file_names in os.walk(files_root) for f in file_names]

    if not unlinked:
        return file_list

    referenced_files = list(get_library_referenced_files())

    return [f for f in file_list if f["path"] not in referenced_files]


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


if __name__ == "__main__":
    bottle.run(app, host="127.0.0.1", port=5000)
