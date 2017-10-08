import fetch from 'isomorphic-fetch'

const Cite = require('citation-js')


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

export function cancelEditScreen() {
  return {
    type: "CANCEL_EDIT_SCREEN"
  }
}

export function saveEditScreen() {
  return (dispatch, getState) => {
    const { editReferenceScreen } = getState();

    if(editReferenceScreen.isModified) {
      const newReferenceData = editReferenceScreen.referenceEditing;
      const id = editReferenceScreen.refID;
      dispatch(updateReference(id, newReferenceData))
    }

    dispatch({
      type: "SAVE_EDIT_SCREEN"
    })
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

/**/
      /*.then(
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
      )*/

      // TODO: The following drops the files field
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

export const saveReferences = () => {
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