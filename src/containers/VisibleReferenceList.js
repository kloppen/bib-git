import { connect } from 'react-redux'
import { toggleReference } from '../actions'
import ReferenceList from '../components/ReferenceList'
import {editReference} from "../actions/index";

const getVisibleReferences = (references, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return references;
    case 'SHOW_COMPLETED':
      return references.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return references.filter(t => !t.completed);
    default:
      return null;
  }
};

const mapStateToProps = state => {
  return {
    references: getVisibleReferences(state.references, state.visibilityFilter)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleReference(id))
    },
    onReferenceEdit: (id, value) => {
      dispatch(editReference(id, value))
    }
  }
};

const VisibleReferenceList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferenceList);

export default VisibleReferenceList
