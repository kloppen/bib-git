const references = (state = [], action) => {
  switch (action.type) {
    case "RECEIVE_LIBRARY":
      return action.json;
    case "UPDATE_REFERENCE":
      // check if the ID already exists
      if (state.map(ref => (ref.id === action.id)).reduce((v, pv) => (v || pv), false)) {
        // the id exists, so update it
        return state.map(reference =>
          (reference.id === action.id)
            ? {...action.newReferenceData}
            : reference
        );
      } else {
        // it's a new id, so add it
        return [
          ...state,
          action.newReferenceData
        ]
      }
    default:
      return state
  }
};

export default references
