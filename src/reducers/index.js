import { combineReducers } from 'redux'
import references from './references'
import visibilityFilter from './visibilityFilter'
import library from './library'
import citation from './citation'
import editReferenceScreen from './editReferenceScreen'

const referenceApp = combineReducers({
  library,
  references,
  visibilityFilter,
  citation,
  editReferenceScreen
});

export default referenceApp