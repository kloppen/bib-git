import fetch from 'isomorphic-fetch'

let nextTodoId = 0;

export const addReference = () => {
  return {
    type: 'ADD_REFERENCE',
    id: nextTodoId++,  // TODO: This needs to change to something else
    author: "Author",
    title: "This is the title"
  }
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

export function fetchLibrary() {
  return function(dispatch) {
    dispatch(requestLibrary());
    return fetch("./MyLibrary.json")
      .then(
        response => response.json(),
        error => console.log("Error fetching library", error)
      )
      .then(
        json => dispatch(receiveLibrary(json))
      )
  }
}

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