const library = (
  state = {
    isFetching: false
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
    case "SAVE_EDIT_MODAL":
      return state;  // TODO: Implement tracking of changes
    default:
      return state
  }
};

export default library
