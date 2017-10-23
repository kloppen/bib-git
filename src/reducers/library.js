const library = (
  state = {
    isFetching: false,
    isModified: false,
    hrefRoot: ""
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_LIBRARY":
      return Object.assign({}, state, {
        isFetching: true
      });
    case "RECEIVE_LIBRARY":
      return Object.assign({}, state, {
        isFetching: false
      });
    case "FAIL_RECEIVE_LIBRARY":
      return Object.assign({}, state, {
        isFetching: false
      });
    case "UPDATE_REFERENCE":
      return Object.assign({}, state, {
        isModified: true
      });
    case "SAVE_REFERENCES":
      return Object.assign({}, state, {
        isModified: false
      });
    case "IMPORT_BIBLATEX":
      return Object.assign({}, state, {
        isModified: true
      });
    case "RECEIVE_FILE_PATH_ROOT":
      return Object.assign({}, state, {
        hrefRoot: action.path
      });
    default:
      return state
  }
};

export default library
