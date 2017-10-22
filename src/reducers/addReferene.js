const addReference = (
  state = {
    isVisible: false,
  },
  action
) => {
  switch (action.type) {
    case "ADD_REFERENCE_MODAL":
      return Object.assign({}, state, {
        isVisible: true
      });
    case "DISMISS_ADD_REFERENCE_MODAL":
      return Object.assign({}, state, {
        isVisible: false
      });
    default:
      return state
  }
};

export default addReference;