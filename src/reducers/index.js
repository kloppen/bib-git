import { combineReducers } from 'redux'
import references from './references'
import visibilityFilter from './visibilityFilter'
import library from './library'

const referenceApp = combineReducers({
  library,
  references,
  visibilityFilter
});

export default referenceApp