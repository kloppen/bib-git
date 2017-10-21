import fetch from 'isomorphic-fetch'

// const Cite = require('citation-js');
import { BibLatexParser, CSLExporter } from 'biblatex-csl-converter'

const FileSaver = require("file-saver");

let nextReferenceId = 0;

export const addReference = () => {
  return (dispatch, getState) => {
    const { references } = getState();

    while(references
      // eslint-disable-next-line
      .map(ref => ref.id === nextReferenceId.toString())
      .reduce((prevVal, elm) => prevVal || elm, false)) {
      ++nextReferenceId
    }

    dispatch({
      type: 'ADD_REFERENCE',
    id: nextReferenceId.toString(),
    })
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
    const { references } = getState();

    dispatch({
      type: "SHOW_EDIT_SCREEN",
      id: id,
      reference: references.filter( (r) => r.id === id)[0]
    })
  };
}

export function dismissEditScreen() {
  return {
    type: "DISMISS_EDIT_SCREEN"
  }
}

export function duplicateIDErrorEditScreen(showError) {
  return {
    type: "DUPLICATE_ID_ERROR_EDIT_SCREEN",
    showError
  }
}

export function saveEditScreen() {
  return (dispatch, getState) => {
    const { editReferenceScreen, references } = getState();

    if(editReferenceScreen.isModified) {
      const newReferenceData = editReferenceScreen.referenceEditing;
      const id = editReferenceScreen.refID;
      const newID = editReferenceScreen.referenceEditing.id;

      const idCount = references
        .filter(r => r.id !== id)
        .map(r => r.id === newID)
        .reduce((v, total) => v + total, 0);

      if (idCount > 0) {
        dispatch(duplicateIDErrorEditScreen(true));
      } else {
        dispatch(updateReference(id, newReferenceData));
        dispatch(dismissEditScreen());
      }
    }
  };
}

export function updateReference(id, newReferenceData) {
  return {
    type: "UPDATE_REFERENCE",
    id,
    newReferenceData
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

export const addFile = (field) => {
  return {
    type: "ADD_FILE",
    field
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

export const editDateField = (key, year, month, date) => {
  return {
    type: "EDIT_DATE_FIELD",
    key,
    year,
    month,
    date
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

export const failReceiveLibrary = () => {  // TODO: Implement for this and other 'receive' functions
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
    return fetch("./library/MyLibrary.json")
      .then(
        response => response.json(),
        error => console.log("Error fetching library", error)
      )
      .then(
        json => dispatch(receiveLibrary(json))
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
  return function (dispatch) {
    new Promise((resolve, reject) => {
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
        json =>
          dispatch({
            type: "IMPORT_BIBLATEX",
            data: json
          })
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
    return fetch("./locales-en-US.xml")
      .then(
        response => response.text()
      )
      .then(
        xml => dispatch(receiveCitationLocale(xml))
      )
  }
}

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

export function fetchCitationStyle() {
  return function(dispatch) {
    dispatch(requestCitationStyle());
    return fetch("./ieee.csl")
      .then(
        response => response.text()
      )
      .then(
        xml => dispatch(receiveCitationStyle(xml))
      )
  }
}

export const requestCitationStyle = () => {
  return {
    type: "REQUEST_CITATION_STYLE"
  }
};

export const receiveCitationStyle = (xml) => {
  return {
    type: "RECEIVE_CITATION_STYLE",
    xml
  }
};