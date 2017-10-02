const citation = (
  state = {
    isVisible: false,
    refID: "",
    isFetchingLocale: false,
    citationLocale: "",
    isFetchingStyle: false,
    citationStyle: ""
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
    case "REQUEST_CITATION_LOCALE":
      return Object.assign({}, state, {
        isFetchingLocale: true,
        citationLocale: null
      });
    case "RECEIVE_CITATION_LOCALE":
      return Object.assign({}, state, {
        isFetchingLocale: false,
        citationLocale: action.xml
      });
    case "REQUEST_CITATION_STYLE":
      return Object.assign({}, state, {
        isFetchingStyle: true,
        citationStyle: null
      });
    case "RECEIVE_CITATION_STYLE":
      return Object.assign({}, state, {
        isFetchingStyle: false,
        citationStyle: action.xml
      });
    default:
      return state
  }
};

export default citation