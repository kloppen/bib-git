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

export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
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

export const failReceiveLibrary = () => {
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