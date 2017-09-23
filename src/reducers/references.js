const references = (state = [], action) => {
  switch (action.type) {
    case 'ADD_REFERENCE':
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          completed: false,
          isEditing: false
        }
      ];
    case 'EDIT_REFERENCE':
      return state.map(reference =>
        (reference.id === action.id)
        ? {...reference, isEditing: true}
        : reference
      );
    case 'TOGGLE_REFERENCE':
      return state.map(reference =>
        (reference.id === action.id)
          ? {...reference, completed: !reference.completed}
          : reference
      );
    default:
      return state
  }
};

export default references
