const references = (state = [], action) => {
  switch (action.type) {
    case 'ADD_REFERENCE':
      return [
        ...state,
        {
          id: action.id
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

      /*
      return [
        ...state,
        ...action.data // TODO: Need to disambiguate keys
      ];*/
    default:
      return state
  }
};

export default references
