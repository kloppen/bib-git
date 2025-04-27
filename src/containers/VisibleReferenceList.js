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
import { filterToStringList, correctCase } from "../common/processFilter"

const refFields = referenceFields;

const checkReferenceForFilter = (cur_ref, cur_filter) => {
  // cur_filer should have the following strucutre
  // {"field": "", "value": "", "tokenize": true, "caseSensitive": false}
  let value = filterToStringList(cur_filter);

  return value.map(flt_val => {
    return refFields.map(field => {
      if(!cur_ref[field.field]) {
        return false;
      }
      if(cur_filter.field !== "" && field.field !== cur_filter.field) {
        return false;
      }
      switch(field.type) {
        case "NAME":
          return cur_ref[field.field].map(
            author => Object.keys(author).map(
              key => correctCase(author[key].toString(), cur_filter).includes(flt_val)
            ).reduce((prevVal, elm) => prevVal || elm, false)
          ).reduce((prevVal, elm) => prevVal || elm, false);
        case "DATE":
          return correctCase(cur_ref[field.field]["date-parts"].toString(), cur_filter).includes(flt_val);
        case "FILE":
        case "LOCAL":
          if(cur_filter.field === "") {
            return false;
          } else {
            return correctCase(cur_ref[field.field].toString(), cur_filter).includes(flt_val);
          }
        default:
          return correctCase(cur_ref[field.field].toString(), cur_filter).includes(flt_val);
      }
    }).reduce((prevVal, elm) => prevVal || elm, false) // any field (that matches criteria)
  }).reduce((prevVal, elm) => prevVal && elm, true) // all flt_val's need to be present
};

const getVisibleReferences = (references, filters) => {
  return references.filter(
    (cur_ref) => {
      return filters.map(cur_filter => checkReferenceForFilter(cur_ref, cur_filter))
        .reduce((prevVal, elm) => prevVal && elm, true)
    }
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
