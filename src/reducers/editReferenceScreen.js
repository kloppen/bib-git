const editReferenceScreen = (
  state = {
    isVisible: false,
    refID: "",
    referenceEditing: null,
    modified: false
  },
  action
) => {
  switch (action.type) {
    case "SHOW_EDIT_SCREEN":
      return Object.assign({}, state, {
        isVisible: true,
        refID: action.id,
        referenceEditing: Object.assign({}, action.reference),
        modified: false
      });
    case "CANCEL_EDIT_SCREEN":
      return Object.assign({}, state, {
        isVisible: false,
        refID: "",
        referenceEditing: null,
        modified: false
      });
    case "SAVE_EDIT_SCREEN":
      return Object.assign({}, state, {
        isVisible: false,
        refId: "",
        referenceEditing: null,
        modified: false
      });
    default:
      return state
  }
};

export default editReferenceScreen;
