import { connect } from 'react-redux'
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
    references: getVisibleReferences(state.references, state.visibilityFilter),
    library: state.library
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onReferenceEdit: (id, key, value) => {
      dispatch(editReference(id, key, value))
    }
  }
};

const VisibleReferenceList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferenceList);

export default VisibleReferenceList
