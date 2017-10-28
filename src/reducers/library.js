const library = (
  state = {
    isFetching: false,
    hasFailed: false,
    hasFailedCitationStyleList: false,
    hasFailedCitationLocale: false,
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
        isFetching: false,
        hasFailed: true
      });
    case "RECEIVE_FILE_PATH_ROOT":
      return Object.assign({}, state, {
        hrefRoot: action.path
      });
    case "FAIL_RECEIVE_CITATION_STYLE_LIST":
      return Object.assign({}, state, {
        hasFailedCitationStyleList: true
      });
    case "FAIL_RECEIVE_CITATION_LOCALE":
      return Object.assign({}, state, {
        hasFailedCitationLocale: true
      });
    default:
      return state
  }
};

export default library
