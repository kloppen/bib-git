const editReferenceScreen = (
  state = {
    isVisible: false,
    refID: "",
    referenceEditing: null,
    isModified: false
  },
  action
) => {
  switch (action.type) {
    case "SHOW_EDIT_SCREEN":
      return Object.assign({}, state, {
        isVisible: true,
        refID: action.id,
        referenceEditing: Object.assign({}, action.reference),
        isModified: false
      });
    case "CANCEL_EDIT_SCREEN":
      return Object.assign({}, state, {
        isVisible: false,
        refID: "",
        referenceEditing: null,
        isModified: false
      });
    case "SAVE_EDIT_SCREEN":
      return Object.assign({}, state, {
        isVisible: false,
        refId: "",
        referenceEditing: null,
        isModified: false
      });
    case "EDIT_REFERENCE_FIELD":
      if(!state.referenceEditing) {
        return state;
      }
      const isChanged = !!state.referenceEditing[action.key] && action.value === state.referenceEditing[action.key];
      return Object.assign({}, state, {
        referenceEditing: Object.assign({}, state.referenceEditing, {[action.key]: action.value}),
        isModified: !isChanged
    });
    default:
      return state
  }
};

export default editReferenceScreen;
