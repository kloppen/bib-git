import { combineReducers } from 'redux'
import references from './references'
import visibilityFilter from './visibilityFilter'
import library from './library'
import citation from './citation'

const referenceApp = combineReducers({
  library,
  references,
  visibilityFilter,
  citation
});

export default referenceApp