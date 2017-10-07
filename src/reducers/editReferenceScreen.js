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
    case "EDIT_AUTHOR_FIELD":
      if (!state.referenceEditing) {
        return state;
      }
      const newAuthorEdit = state.referenceEditing.author.map((a, index) =>
        index === action.index
          ? Object.assign({}, a, {[action.key]: action.value})
          : a
      );
      return Object.assign({}, state, {
        referenceEditing: Object.assign({}, state.referenceEditing, {
          author: newAuthorEdit
        }),
        isModified: !state.referenceEditing.author[action.index][action.key] ||
        state.referenceEditing.author[action.index][action.key] !== action.value
      });
    case "ADD_AUTHOR_EDIT_SCREEN":
      if (!state.referenceEditing) {
        return state;
      }
      const newAuthorAdd = !!state.referenceEditing.author
        ? [...state.referenceEditing.author, {}]
        : [{}];
      return Object.assign({}, state, {
        referenceEditing: Object.assign({}, state.referenceEditing, {
          author: newAuthorAdd
        })
      });
    case "REMOVE_AUTHOR_EDIT_SCREEN":
      if (!state.referenceEditing) {
        return state;
      }
      const newAuthorRemove = state.referenceEditing.author.filter((a, index) =>
        index !== action.index
      );
      return Object.assign({}, state, {
        referenceEditing: Object.assign({}, state.referenceEditing, {
          author: newAuthorRemove
        }),
        isModified: true
      });
    default:
      return state
  }
};

export default editReferenceScreen;
