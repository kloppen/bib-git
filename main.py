import bottle
from bottle import request, response
from bottle import post, get, put, delete
import json
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
        library_data = json.load(library)
    return json.dumps(library_data)


@get("/api/filepath")
def get_filepath():
    """
    Gets the path to prepend on links to reference attachments. Includes file:/// at the beginning and no trailing slash
    :return: A string representing the path
    """
    dir_path = os.path.dirname(os.path.realpath(__file__))
    dir_path = os.path.join(dir_path, "library")
    return pathlib.Path(dir_path).as_uri()


if __name__ == "__main__":
    bottle.run(app, host="127.0.0.1", port=5000)
