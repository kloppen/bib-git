// Action types
export const ADD_REF = 'ADD_REF';
export const FILTER_REFS = 'FILTER_REFS';
export const SELECT_REFS_FILE = 'SELECT_REFS_FILE';
export const RECEIVE_REFS_FILE = 'RECEIVE_REFS_FILE';

let nextRefId = 0;

// Action creators
export const addRef = title => {
  return {
    type: ADD_REF,
    id: nextRefId++,
    title
  }
};

/*
export function setRefFilter(filter) {
  return { type: FILTER_REFS, filter }
}

export function selectRefsFile(url) {
  return { type: SELECT_REFS_FILE, url }
}

export function receiveRefsFile(url, json) {
  return {
    type: RECEIVE_REFS_FILE,
    url,
    refsFile: json.data.children.map(child => child.data)
  }
}
*/
