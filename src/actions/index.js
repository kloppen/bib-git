let nextTodoId = 0;

export const addReference = () => {
  return {
    type: 'ADD_REFERENCE',
    id: nextTodoId++,
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

export const editReference = (id, value) => {
  return {
    type: 'EDIT_REFERENCE',
    id: id,
    value: value
  }
};

