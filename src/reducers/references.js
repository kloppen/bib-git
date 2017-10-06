const references = (state = [], action) => {
  switch (action.type) {
    case 'ADD_REFERENCE':
      return [
        ...state,
        {
          id: action.id,
          author: action.author,
          title: action.title
        }
      ];
    case "RECEIVE_LIBRARY":
      return action.json;
    case "UPDATE_REFERENCE":
      return state.map(reference =>
        (reference.id === action.id)
        ? { ...action.newReferenceData }
        : reference
      );
    default:
      return state
  }
};

export default references
