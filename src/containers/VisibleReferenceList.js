// Copyright (C) 2017, Stefan Kloppenborg
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
    library: state.library,
    visibilityFilter: state.visibilityFilter
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
