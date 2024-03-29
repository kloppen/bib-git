// Copyright (C) 2017, Stefan Kloppenborg
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import fetch from 'isomorphic-fetch'

// const Cite = require('citation-js');
import { BibLatexParser, CSLExporter } from 'biblatex-csl-converter'

const FileSaver = require("file-saver");

let nextReferenceId = 0;

const apiServer = "http://localhost:5032";

export const addReference = () => {
  return (dispatch, getState) => {
    const { references } = getState();

    while(references
      // eslint-disable-next-line
      .map(ref => ref.id === nextReferenceId.toString())
      .reduce((prevVal, elm) => prevVal || elm, false)) {
      ++nextReferenceId
    }

    dispatch(showEditScreen(nextReferenceId))
  };
};

export const setFilterText = filter => {
  return {
    type: "SET_FILTER_TEXT",
    filter
  }
};

export function showEditScreen(id) {
  return (dispatch, getState) => {
    return fetch(`${apiServer}/api/files?unlinked`)
      .then(
        resp => resp.json(),
        error => {
          throw new Error("Failed to file list" + error)
        }
      )
      .then(
        json => {
          dispatch({
            type: "RECEIVE_FILE_LIST",
            json
          })
        },
        error => {
          throw new Error("Failed to file list" + error)
        }
      )
      .then(
        ()=> {
          const {references} = getState();

          const refToEdit = references.filter((r) => r.id === id)[0];

          dispatch({
            type: "SHOW_EDIT_SCREEN",
            id: id,
            reference: !!refToEdit ? refToEdit : {}
          })
        },
        error => {
          console.log("Failed to file list", error)
        }
      )

  }


}

export function dismissEditScreen() {
  return {
    type: "DISMISS_EDIT_SCREEN"
  }
}

export function IDErrorEditScreen(showError) {
  return {
    type: "ID_ERROR_EDIT_SCREEN",
    showError
  }
}

export function saveEditScreen() {
  return (dispatch, getState) => {
    const { editReferenceScreen, references } = getState();

    if(editReferenceScreen.isModified) {
      const id = editReferenceScreen.refID;
      const newID = editReferenceScreen.referenceEditing.id;

      // remove any empty fields from newReferenceData
      const newReferenceData = Object.keys(editReferenceScreen.referenceEditing)
        .filter(k => {
          let curVal = editReferenceScreen.referenceEditing[k];
          return (curVal !== "" &&
            !(curVal.constructor === Object && Object.keys(curVal).length === 0) &&
            !(curVal.constructor === Array && curVal.length === 0));
        })
        .reduce((obj, key) => {
          obj[key] = editReferenceScreen.referenceEditing[key];
          return obj;
        }, {});

      const idCount = references
        .filter(r => r.id !== id)
        .map(r => r.id === newID)
        .reduce((v, total) => v + total, 0);

      if (idCount > 0 || newID.trim() === "") {
        dispatch(IDErrorEditScreen(true));
      } else {
        dispatch(updateReference(id, newReferenceData));
      }
    } else {
      // not modified. Just exit.
      dispatch(dismissEditScreen());
    }
  };
}

export function updateReference(id, newReferenceData) {
  return(dispatch) => {
    return fetch(
      `${apiServer}/api/library/${encodeURIComponent(id)}`,
      {
        method: "PUT",
        body: JSON.stringify(newReferenceData)
      }
    )
      .then(
        response => {
          dispatch(updateReferenceLocal(id, newReferenceData));
          dispatch(dismissEditScreen());
        },
        error => dispatch(failUpdateReference())
      )
  };

}

export function updateReferenceLocal(id, newReferenceData) {
  return {
    type: "UPDATE_REFERENCE",
    id,
    newReferenceData
  }
}

export function failUpdateReference() {
  return {
    type: "FAIL_UPDATE_REFERENCE"
  }
}

export const editReferenceField = (key, value) => {
  return {
    type: 'EDIT_REFERENCE_FIELD',
    key: key,
    value: value
  }
};

export const editFileField = (field, index, value) => {
  return {
    type: "EDIT_FILE_FIELD",
    field,
    index,
    value
  }
};

export const removeFile = (field, index) => {
  return {
    type: 'REMOVE_FILE',
    field,
    index
  }
};

export const addFile = (field, file) => {
  return {
    type: "ADD_FILE",
    field,
    file
  }
};

export const editNameField = (field, index, key, value) => {
  return {
    type: "EDIT_NAME_FIELD",
    field,
    index,
    key,
    value
  }
};

export const addName = (field) => {
  return {
    type: 'ADD_NAME',
    field
  }
};

export const removeName = (field, index) => {
  return {
    type: 'REMOVE_NAME',
    field,
    index
  }
};

export const requestLibrary = () => {
  return {
    type: "REQUEST_LIBRARY"
  }
};

export const receiveLibrary = (json) => {
  return {
    type: "RECEIVE_LIBRARY",
    json
  }
};

export const failReceiveLibrary = () => {
  return {
    type: "FAIL_RECEIVE_LIBRARY"
  }
};


/*
The citation.js implementation
- Currently (OCt-2017), this only reads the fields defined in base BibTeX.
  as such, things like the abstract and file (links) are not read. If
  BibLaTeX is added to citation.js in the future, this code could be
  re-introduced.

export function fetchLibrary() {
  return function (dispatch) {
    dispatch(requestLibrary());
    return fetch("./library/MyLibrary.bib")
      .then(
        response => response.text(),
        error => console.log("Error fetching library", error)
      )
      .then(
        bibString => {
          return new Cite(bibString, {
            forceType: "string/bibtex"
          })
        }
      )
      .then(
        parser => {
          const csl = parser.get({
            type: 'json',
            style: 'csl'
          });
          return csl;
        }
      )
      .then(
        json => dispatch(receiveLibrary(json))
      )
  }
}
*/

/*
The biblatex-csl-converter implementation
- biblatex-csl-converter only converts from biblatex to CSL, not the other
  way around, so this library cannot be used to save. Because of this fact,
  this library should be abandoned
*/
/*
export function fetchLibrary() {
  return function (dispatch) {
    dispatch(requestLibrary());
    return fetch("./library/MyLibrary.bib")
      .then(
        response => response.text(),
        error => console.log("Error fetching library", error)
      )
      .then(
        bibString => new BibLatexParser(bibString, {
          processUnexpected: true,
          processUnknown: {
            collaborator: "l_name"
          }
        })
      )
      .then(
        parser => parser.output
      )
      .then(
        intermediateJSON => {
          const exporter = new CSLExporter(intermediateJSON);
          let cslJSON = exporter.output;

          return Object.keys(cslJSON).map(key =>
            (intermediateJSON[key] &&
              intermediateJSON[key]["unexpected_fields"] &&
              intermediateJSON[key]["unexpected_fields"]["file"])
              ? Object.assign({}, cslJSON[key], {file: intermediateJSON[key]["unexpected_fields"]["file"]})
              : cslJSON[key]
          );
        }
      )
      .then(
        json => dispatch(receiveLibrary(json))
      )
  }
}
*/

export function fetchLibrary() {
  return function(dispatch) {
    dispatch(requestLibrary());
    return fetch(`${apiServer}/api/library`)
      .then(
        response => response.json(),
        error => {
          throw new Error("Failed to receive library" + error)
        }
      )
      .then(
        json => dispatch(receiveLibrary(json)),
        error => {
          throw new Error("Failed to receive library" + error)
        }
      )
      .catch(
        error => {
          console.log("Error fetching library", error);
          dispatch(failReceiveLibrary())
        }
      )
  }
}

export const saveLibrary = () => {
  return (dispatch, getState) => {
    const { references } = getState();

    const blob = new Blob([JSON.stringify(references, null, 2)], {type: "application/json"});
    FileSaver.saveAs(blob, "MyLibrary.json");

    dispatch({
      type: "SAVE_REFERENCES"
    })
  }
};

/*
The citation.js implementation
- Currently (OCt-2017), citation.js doesn't read all the fields we need, so abandoning this for now

export const saveLibrary = () => {
  return (dispatch, getState) => {
    const { references } = getState();

    const data = new Cite(references, {
            forceType: "array/csl"
          });

    const output = data.get({
      type: 'string',
      style: 'bibtex'
    });



    dispatch({
      type: "SAVE_REFERENCES",
      data: output
    })
  }
};*/
/*
export function fetchLibrary() {
  return function (dispatch) {
    dispatch(requestLibrary());
    return fetch("./library/MyLibrary.bib")
      .then(
        response => response.text(),
        error => console.log("Error fetching library", error)
      )
      .then(
        bibString => new BibLatexParser(bibString, {
          processUnexpected: true,
          processUnknown: {
            collaborator: "l_name"
          }
        })
      )
      .then(
        parser => parser.output
      )
      .then(
        intermediateJSON => {
          const exporter = new CSLExporter(intermediateJSON);
          let cslJSON = exporter.output;

          return Object.keys(cslJSON).map(key =>
            (intermediateJSON[key] &&
              intermediateJSON[key]["unexpected_fields"] &&
              intermediateJSON[key]["unexpected_fields"]["file"])
              ? Object.assign({}, cslJSON[key], {file: intermediateJSON[key]["unexpected_fields"]["file"]})
              : cslJSON[key]
          );
        }
      )
      .then(
        json => dispatch(receiveLibrary(json))
      )
  }
}
*/

export const importBibLaTeX = (biblatex) => {
  return function (dispatch, getState) {
    new Promise((resolve) => {
        resolve(biblatex)
      }
    )
      .then(
        bibString => new BibLatexParser(bibString, {
          processUnexpected: true,
          processUnknown: {
            collaborator: "l_name"
          }
        })
      )
      .then(
        parser => parser.output
      )
      .then(
        intermediateJSON => {
          const exporter = new CSLExporter(intermediateJSON);
          let cslJSON = exporter.output;

          return Object.keys(cslJSON).map(key =>
            Object.assign({}, cslJSON[key],
              (intermediateJSON[key] &&
                intermediateJSON[key]["unexpected_fields"] &&
                intermediateJSON[key]["unexpected_fields"]["file"])
                ? {file: intermediateJSON[key]["unexpected_fields"]["file"]}
                : {},
              (intermediateJSON[key]["entry_key"])
                ? {id: intermediateJSON[key]["entry_key"]}
                : {}
            )
          );
        }
      )
      .then(
        json => {
          const tryToAdd = (currentList, newItem) => {
            if(currentList.map((i) => i.id === newItem.id).reduce((v, p) => v || p, false)) {
              return tryToAdd(currentList, Object.assign({}, newItem, {id: newItem["id"] + "1"}));
            }
            return Object.assign({}, newItem);
          };

          for(let r of json) {
            let { references } = getState();
            let newRef = tryToAdd(references, r);
            dispatch(updateReference(newRef.id, newRef))
          }
        }
      )
  }
};

export function showCitation(id) {
  return {
    type: "SHOW_CITATION",
    id
  }
}

export function dismissCitation() {
  return {
    type: "DISMISS_CITATION"
  }
}

export function fetchCitationLocale() {
  return function(dispatch) {
    dispatch(requestCitationLocale());
    return fetch(`${apiServer}/api/csl-locales/locales-en-US`)
      .then(
        response => response.text(),
        error => {
          throw new Error("Error fetching CSL locale" + error)
        }
      )
      .then(
        xml => dispatch(receiveCitationLocale(xml)),
        error => {
          throw new Error("Error fetching CSL locale" + error)
        }
      )
      .catch(
        error => {
          console.log("Error fetching CSL locale" + error)
          dispatch(failReceiveCitationLocale())
        }
      )
  }
}

export const failReceiveCitationLocale = () => {
  return {
    type: "FAIL_RECEIVE_CITATION_LOCALE"
  }
};

export const requestCitationLocale = () => {
  return {
    type: "REQUEST_CITATION_LOCALE"
  }
};

export const receiveCitationLocale = (xml) => {
  return {
    type: "RECEIVE_CITATION_LOCALE",
    xml
  }
};

export function fetchCitationStyleList() {
  return function(dispatch) {
    return fetch(`${apiServer}/api/csl-styles`)
      .then(
        response => response.json(),
        error => {
          throw new Error("Error fetching citation style list" + error)
        }
      )
      .then(
        styleList => dispatch(receiveCitationStyleList(styleList)),
        error => {
          throw new Error("Error fetching citation style list" + error)
        }
      )
      .catch(
        error => {
          console.log("Error fetching citation style list", error);
          dispatch(failReceiveCitationStyleList())
        }
      )
  }
}

export function failReceiveCitationStyleList() {
  return {
    type: "FAIL_RECEIVE_CITATION_STYLE_LIST"
  }
}

export function receiveCitationStyleList(styleList) {
  return {
    type: "RECEIVE_CITATION_STYLE_LIST",
    styleList
  }
}

export function fetchCitationStyle(styleName) {
  return function(dispatch) {
    dispatch(requestCitationStyle());
    return fetch(`${apiServer}/api/csl-styles/${styleName}`)
      .then(
        response => response.text(),
        error => {
          throw new Error("Error fetching citation style" + error)
        }
      )
      .then(
        xml => dispatch(receiveCitationStyle(xml, styleName)),
        error => {
          throw new Error("Error fetching citation style" + error)
        }
      )
      .catch(
        error => {
          console.log("Failed to receive citation style", error);
          dispatch(failReceiveCitationStyle())
        }
      )
  }
}

export const failReceiveCitationStyle = () => {
  return {
    type: "FAIL_RECEIVE_CITATION_STYLE"
  }
};

export const requestCitationStyle = () => {
  return {
    type: "REQUEST_CITATION_STYLE"
  }
};

export const receiveCitationStyle = (xml, styleName) => {
  return {
    type: "RECEIVE_CITATION_STYLE",
    xml,
    styleName
  }
};

export const getFilePathRoot = () => {
  return function(dispatch) {
    return fetch(`${apiServer}/api/filepath`)
      .then(
        response => response.text()
      )
      .then(
        path => dispatch(receiveFilePathRoot(path))
      )
  }
};

export const receiveFilePathRoot = (path) => {
  return {
    type: "RECEIVE_FILE_PATH_ROOT",
    path
  }
};
