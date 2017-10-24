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


@get("/api/library")
def get_library():
    """
    Gets the JSON object representing the library stored on disk
    :return: A JSON-formatted string
    """
    library_path = os.path.join("library", "MyLibrary.json")
    with open(library_path, "r") as library:
        return library.read()


@get("/api/filepath")
def get_filepath():
    """
    Gets the path to prepend on links to reference attachments. Includes file:/// at the beginning and no trailing slash
    :return: A string representing the path
    """
    dir_path = os.path.dirname(os.path.realpath(__file__))
    dir_path = os.path.join(dir_path, "library")
    return pathlib.Path(dir_path).as_uri()


@get("/api/csl-styles")
def get_csl_styles_listing():
    """
    Gets a listing of all available CSL styles
    :return: A JSON-formatted string (a list in JSON)
    """
    csl_list = os.listdir("csl-styles")
    csl_list = [c.split(".csl")[0] for c in csl_list if c.endswith(".csl")]
    csl_list.sort()
    return json.dumps(csl_list)


@get("/api/csl-styles/<name>")
def get_csl_style(name):
    """
    Gets a particular CSL style.
    :param name: the name of the CSL style to retrieve. Does not include .csl extension
    :return: An XML object
    """
    try:
        csl_path = os.path.join("csl-styles", "{}.csl".format(name))
        with open(csl_path, "r") as csl:
            return csl.read()
    except IOError:
        response.status = 400
        return


if __name__ == "__main__":
    bottle.run(app, host="127.0.0.1", port=5000)
