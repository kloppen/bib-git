import { connect } from 'react-redux'
import ReferenceList from '../components/ReferenceList'
import { referenceFields } from "../common/referenceFields";

const refFields = referenceFields;

const getVisibleReferences = (references, filter) => {
  const uprFilter = filter.toUpperCase().match(/\S+/g) || [];  // since match returns null if no match

  return references.filter(
    (r) =>
      uprFilter.map(flt =>
        refFields.map(field => {
          if(!r[field.field]) {
            return false;
          }
          switch(field.type) {
            case "NAME":
              return r[field.field].map(
                author => Object.keys(author).map(
                  key => author[key].toString().toUpperCase().includes(flt)
                ).reduce((prevVal, elm) => prevVal || elm, false)
              ).reduce((prevVal, elm) => prevVal || elm, false);
            case "DATE":
              return r[field.field]["date-parts"].toString().toUpperCase().includes(flt);
            case "FILE":
              return false;
            default:
              return r[field.field].toString().toUpperCase().includes(flt)
          }

        }).reduce((prevVal, elm) => prevVal || elm, false)
      )
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
    /*onReferenceEditModal: (id) => {
      dispatch(showEditScreen(id, state.references[0]))
    }*/
  }
};

const VisibleReferenceList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferenceList);

export default VisibleReferenceList
