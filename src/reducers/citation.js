const citation = (
  state = {
    isVisible: false,
    refID: ""
  },
  action
) => {
  switch (action.type) {
    case "SHOW_CITATION":
      return Object.assign({}, state, {
        isVisible: true,
        refID: action.id
      });
    case "DISMISS_CITATION":
      return Object.assign({}, state, {
        isVisible: false,
        refID: ""
      });
    default:
      return state
  }
};

export default citation