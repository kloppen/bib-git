const references = (state = [], action) => {
  switch (action.type) {
    case "RECEIVE_LIBRARY":
      return action.json;
    case "UPDATE_REFERENCE":
      // check if the ID already exists
      if(state.map(ref => (ref.id === action.id)).reduce((v, pv) => (v || pv), false)) {
        // the id exists, so update it
        return state.map(reference =>
          (reference.id === action.id)
          ? { ...action.newReferenceData }
          : reference
        );
      } else {
        // it's a new id, so add it
        return [
          ...state,
          action.newReferenceData
        ]
      }
    case "IMPORT_BIBLATEX":
      const disambiguatedRefs = [];

      const tryToAdd = (currentList, newItem) => {
        if(currentList.map((i) => i.id === newItem.id).reduce((v, p) => v || p, false)) {
          return tryToAdd(currentList, Object.assign({}, newItem, {id: newItem["id"] + "1"}));
        }
        return Object.assign({}, newItem);
      };

      for (let r of state) {
        disambiguatedRefs.push(tryToAdd(disambiguatedRefs, r))
      }

      for (let r of action.data) {
        disambiguatedRefs.push(tryToAdd(disambiguatedRefs, r))
      }

      return disambiguatedRefs;
    default:
      return state
  }
};

export default references
