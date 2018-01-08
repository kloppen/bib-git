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

const references = (state = [], action) => {
  switch (action.type) {
    case "RECEIVE_LIBRARY":
      return action.json;
    case "UPDATE_REFERENCE":
      // check if the ID already exists
      if (state.map(ref => (ref.id === action.id)).reduce((v, pv) => (v || pv), false)) {
        // the id exists, so update it
        return state.map(reference =>
          (reference.id === action.id)
            ? {...action.newReferenceData}
            : reference
        );
      } else {
        // it's a new id, so add it
        return [
          ...state,
          action.newReferenceData
        ]
      }
    default:
      return state
  }
};

export default references
