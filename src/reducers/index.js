import { combineReducers } from 'redux'
import references from './references'
import visibilityFilter from './visibilityFilter'

const referenceApp = combineReducers({
  references,
  visibilityFilter
});

export default referenceApp