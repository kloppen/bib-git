const editReferenceScreen = (state = {
                               isVisible: false,
                               refID: "",
                               referenceEditing: null,
                               isModified: false
                             },
                             action) => {
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
      if (!state.referenceEditing) {
        return state;
      }
      return Object.assign({}, state, {
        referenceEditing: Object.assign({}, state.referenceEditing, {[action.key]: action.value}),
        isModified: !state.referenceEditing[action.key] || action.value !== state.referenceEditing[action.key]
      });
    case "EDIT_NAME_FIELD":
      if (!state.referenceEditing) {
        return state;
      }
      const newNameValue = state.referenceEditing[action.field].map((a, index) =>
        index === action.index
          ? Object.assign({}, a, {[action.key]: action.value})
          : a
      );
      return Object.assign({}, state, {
        referenceEditing: Object.assign({}, state.referenceEditing, {
          [action.field]: newNameValue
        }),
        isModified: !state.referenceEditing[action.field][action.index][action.key] ||
        state.referenceEditing[action.field][action.index][action.key] !== action.value
      });
    case "ADD_NAME":
      if (!state.referenceEditing) {
        return state;
      }
      const newNameAdd = !!state.referenceEditing[action.field]
        ? [...state.referenceEditing[action.field], {}]
        : [{}];
      // Won't change the isModified flag until the user actually adds some text to the new name field
      return Object.assign({}, state, {
        referenceEditing: Object.assign({}, state.referenceEditing, {
          [action.field]: newNameAdd
        })
      });
    case "REMOVE_NAME":
      if (!state.referenceEditing) {
        return state;
      }
      const newNameRemove = state.referenceEditing[action.field].filter((a, index) =>
        index !== action.index
      );
      return Object.assign({}, state, {
        referenceEditing: Object.assign({}, state.referenceEditing, {
          [action.field]: newNameRemove
        }),
        isModified: true
      });
    default:
      return state
  }
};

export default editReferenceScreen;
