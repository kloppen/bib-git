const visibilityFilter = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER_TEXT":
      return action.filter;
    default:
      return state
  }
};

export default visibilityFilter
