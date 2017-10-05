import { combineReducers } from 'redux'
import references from './references'
import visibilityFilter from './visibilityFilter'
import library from './library'
import citation from './citation'
import editReferenceModal from './editReferenceModal'

const referenceApp = combineReducers({
  library,
  references,
  visibilityFilter,
  citation,
  editReferenceModal
});

export default referenceApp