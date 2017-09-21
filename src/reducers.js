import { combineReducers } from 'redux'
import {
  ADD_REF//,
  //FILTER_REFS,
  //SELECT_REFS_FILE,
  //RECEIVE_REFS_FILE
} from "./actions";

/*
function filterRefs(state = "", action) {
  switch (action.type) {
    case FILTER_REFS:
      return action.filter;
    default:
      return state;
  }
}
*/

const refs = (
  state = [],
  action) => {
  switch (action.type) {
    case ADD_REF:
      return [
        ...state,
        {
          id: action.id,
          title: action.title
        }
      ];
    default:
      return state;
  }
};

/*
function refsFile(state = "", action) {
  switch (action.type) {
    case SELECT_REFS_FILE:
      return action.selectRefsFile;
    default:
      return state;
  }
}
*/

/*
function refsList(state = {
                    isFetching: false,
                    items: []
                  },
                  action
){
  switch (action.type) {
    default:
      return state;
  }
}
*/

const refApp = combineReducers({
  refs
});

export default refApp;
