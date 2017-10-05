import { connect } from 'react-redux'
import ReferenceList from '../components/ReferenceList'
import { showEditScreen } from "../actions/index";

const getVisibleReferences = (references, filter) => {
  // TODO: search on other fields

  const uprFilter = filter.toUpperCase().match(/\S+/g) || [];  // since match returns null if no match

  return references.filter(
    (r) =>
      uprFilter.map(flt => r.title.toUpperCase().includes(flt))
        .reduce((prevVal, elm) => prevVal && elm, true)
  );
};

const mapStateToProps = state => {
  return {
    references: getVisibleReferences(state.references, state.visibilityFilter),
    library: state.library
  }
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    onReferenceEditModal: (id) => {
      dispatch(showEditScreen(id, state.references[0]))
    }
  }
};

const VisibleReferenceList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferenceList);

export default VisibleReferenceList
