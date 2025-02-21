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

const visibilityFilter = (
  state = [
    {"id": "search", "field": "", "value": "", "tokenize": true, "caseSensitive": false}
  ],
  action) => {

  switch (action.type) {
    case "SET_FILTER_TEXT":
      return state.filter(f => f.id !== "search")
        .concat([{"id": "search", "field": "", "value": action.filter, "tokenize": true, "caseSensitive": false}]);
    case "RECEIVE_DEAD_LINKS":
      const files = action.json;
      return state.filter(f => f.id !== "deadlink")
        .concat(files.map(f => {
          return {
            "id": "deadlink",
            "field": "file",
            "value": f,
            "tokenize": false,
            "caseSensitive": false
          };
        }));
    case "DISMISS_DEAD_LINKS":
      return state.filter(f => f.id !== "deadlink");
    default:
      return state;
  }
};

export default visibilityFilter
