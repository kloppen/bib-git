let nextTodoId = 0;

export const addReference = title => {
  return {
    type: 'ADD_REFERENCE',
    id: nextTodoId++,
    title: title
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
