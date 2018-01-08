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

const library = (
  state = {
    isFetching: false,
    hasFailed: false,
    hasFailedCitationStyleList: false,
    hasFailedCitationLocale: false,
    hrefRoot: ""
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_LIBRARY":
      return Object.assign({}, state, {
        isFetching: true
      });
    case "RECEIVE_LIBRARY":
      return Object.assign({}, state, {
        isFetching: false
      });
    case "FAIL_RECEIVE_LIBRARY":
      return Object.assign({}, state, {
        isFetching: false,
        hasFailed: true
      });
    case "RECEIVE_FILE_PATH_ROOT":
      return Object.assign({}, state, {
        hrefRoot: action.path
      });
    case "FAIL_RECEIVE_CITATION_STYLE_LIST":
      return Object.assign({}, state, {
        hasFailedCitationStyleList: true
      });
    case "FAIL_RECEIVE_CITATION_LOCALE":
      return Object.assign({}, state, {
        hasFailedCitationLocale: true
      });
    default:
      return state
  }
};

export default library
