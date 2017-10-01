import fetch from 'isomorphic-fetch'

let nextTodoId = 0;

export const addReference = () => {
  return {
    type: 'ADD_REFERENCE',
    id: nextTodoId++,
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

export const editReference = (id, key, value) => {
  return {
    type: 'EDIT_REFERENCE',
    id: id,
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

export const failReceiveLibrary = () => {  // TODO: Implement
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
