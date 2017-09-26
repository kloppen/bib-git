const references = (state = [], action) => {
  switch (action.type) {
    case 'ADD_REFERENCE':
      return [
        ...state,
        {
          id: action.id,
          author: action.author,
          title: action.title,
          completed: false
        }
      ];
    case 'TOGGLE_REFERENCE':
      return state.map(reference =>
        (reference.id === action.id)
          ? {...reference, completed: !reference.completed}
          : reference
      );
    case 'EDIT_REFERENCE':
      return state.map(reference =>
        (reference.id === action.id)
        ? {...reference, [action.key]: action.value }
        : reference
      );
    case "RECEIVE_LIBRARY":
      return action.json;
    default:
      return state
  }
};

export default references
