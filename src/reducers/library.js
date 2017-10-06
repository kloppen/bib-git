const library = (
  state = {
    isFetching: false,
    isModified: false
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
    default:
      return state
  }
};

export default library
