const editReferenceScreen = (state = {
                               isVisible: false,
                               refID: "",
                               referenceEditing: null,
                               isModified: false,
                               isShowingDuplicateIDError: false,
                               hasFailedUpdatedReference: false,
                               fileList: []
                             },
                             action) => {
  switch (action.type) {
    case 'ADD_REFERENCE':
      return Object.assign({}, state, {
        isVisible: true,
        refID: action.id,
        referenceEditing: Object.assign({}, {
          id: action.id
        }),
        isModified: false,
        hasFailedUpdatedReference: false
      });
    case "SHOW_EDIT_SCREEN":
      return Object.assign({}, state, {
        isVisible: true,
        refID: action.id,
        referenceEditing: Object.assign({}, action.reference),
        isModified: false,
        hasFailedUpdatedReference: false
      });
    case "DISMISS_EDIT_SCREEN":
      return Object.assign({}, state, {
        isVisible: false,
        refID: "",
        referenceEditing: null,
        isModified: false
      });
    case "FAIL_UPDATE_REFERENCE":
      return Object.assign({}, state, {
        hasFailedUpdatedReference: true
      });
    case "DUPLICATE_ID_ERROR_EDIT_SCREEN":
      return Object.assign({}, state, {
        isShowingDuplicateIDError: action.showError
      });
    case "EDIT_REFERENCE_FIELD":
      if (!state.referenceEditing) {
        return state;
      }
      return Object.assign({}, state, {
        referenceEditing: Object.assign({}, state.referenceEditing, {[action.key]: action.value}),
        isModified: state.isModified ||
          !state.referenceEditing[action.key] ||
          action.value !== state.referenceEditing[action.key]
      });
    case "EDIT_DATE_FIELD":
      if (!state.referenceEditing) {
        return state;
      }
      const newRefEditing = {
        [action.key]: {
          "date-parts": [
            [
              action.year.toString(),
              action.month,
              action.date
            ]
          ]
        }
      };
      return Object.assign({}, state, {
        referenceEditing: Object.assign({}, state.referenceEditing, newRefEditing),
        isModified: state.isModified ||
          !state.referenceEditing[action.key] ||
          newRefEditing !== state.referenceEditing[action.key]
      });
    case "EDIT_FILE_FIELD":
      if (!state.referenceEditing) {
        return state;
      }

      const newFileValue = state.referenceEditing[action.field].split(";").map((f, index) =>
        index === action.index
          ? action.value
          : f
      ).join(";");

      return Object.assign({}, state, {
        referenceEditing: Object.assign({}, state.referenceEditing, {
          [action.field]: newFileValue
        }),
        isModified: state.isModified ||
          !state.referenceEditing[action.field] ||
          state.referenceEditing[action.field] !== newFileValue
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
        isModified: state.isModified ||
          !state.referenceEditing[action.field][action.index][action.key] ||
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
    case "ADD_FILE":
      if (!state.referenceEditing || action.file === "") {
        return state;
      }
      return Object.assign({}, state, {
        referenceEditing: Object.assign({}, state.referenceEditing, {
          [action.field]: [...state.referenceEditing[action.field].split(";"), action.file].join(";")
        }),
        isModified: true
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
    case "REMOVE_FILE":
      if (!state.referenceEditing) {
        return state;
      }
      const newFileRemove = state.referenceEditing[action.field].split(";").filter((a, index) =>
        index !== action.index
      ).join(";");
      return Object.assign({}, state, {
        referenceEditing: Object.assign({}, state.referenceEditing, {
          [action.field]: newFileRemove
        }),
        isModified: true
      });
    case "RECEIVE_FILE_LIST":
      return Object.assign({}, state, {
        fileList: action.json
      });
    default:
      return state
  }
};

export default editReferenceScreen;
