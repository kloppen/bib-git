import bottle
from bottle import request, response
from bottle import post, get, put, delete
import json
import os
import os.path
import pathlib

app = application = bottle.default_app()


@app.hook('after_request')
def enable_cors():
    """
    You need to add some headers to each request.
    Don't use the wildcard '*' for Access-Control-Allow-Origin in production.
    """
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'


def get_file_contents(directory, file):
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
        return


@get("/api/library")
def get_library():
    """
    Gets the JSON object representing the library stored on disk
    :return: A JSON-formatted string
    """
    return get_file_contents("library", "MyLibrary.json")


@get("/api/filepath")
def get_filepath():
    """
    Gets the path to prepend on links to reference attachments. Includes file:/// at the beginning and no trailing slash
    :return: A string representing the path
    """
    dir_path = os.path.dirname(os.path.realpath(__file__))
    dir_path = os.path.join(dir_path, "library")
    return pathlib.Path(dir_path).as_uri()


def get_directory_listing(directory, ext):
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
def get_csl_styles_listing():
    """
    Gets a listing of all available CSL styles
    :return: A JSON-formatted string (a list in JSON)
    """
    return get_directory_listing("csl-styles", ".csl")


@get("/api/csl-styles/<name>")
def get_csl_style(name):
    """
    Gets a particular CSL style.
    :param name: the name of the CSL style to retrieve. Does not include .csl extension
    :return: An XML object
    """
    return get_file_contents("csl-styles", "{}.csl".format(name))


@get("/api/csl-locales")
def get_csl_locales_listing():
    """
    Gets a listinf of all available CSL locales
    :return: A JSON-formatted string (a list in JSON)
    """
    return get_directory_listing("csl-locales", ".xml")


@get("/api/csl-locales/<name>")
def get_csl_locale(name):
    """
    Gets a particular CSL locale
    :param name: the name of the CSL locale to retrieve. Does not include .xml extension
    :return: An XML object
    """
    return get_file_contents("csl-locales", "{}.xml".format(name))


if __name__ == "__main__":
    bottle.run(app, host="127.0.0.1", port=5000)
