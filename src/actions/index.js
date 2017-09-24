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

export const toggleReference = id => {
  return {
    type: 'TOGGLE_REFERENCE',
    id
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

