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

const citation = (
  state = {
    isVisible: false,
    refID: "",
    isFetchingLocale: false,
    citationLocale: "",
    isFetchingStyle: false,
    citationStyle: "",
    citationStyleName: "",
    citationStyleList: [],
    hasFailedCitation: false,
    hasFailedCitationStyleList: false
  },
  action
) => {
  switch (action.type) {
    case "SHOW_CITATION":
      return Object.assign({}, state, {
        isVisible: true,
        refID: action.id
      });
    case "DISMISS_CITATION":
      return Object.assign({}, state, {
        isVisible: false,
        refID: ""
      });
    case "REQUEST_CITATION_LOCALE":
      return Object.assign({}, state, {
        isFetchingLocale: true,
        citationLocale: null
      });
    case "RECEIVE_CITATION_LOCALE":
      return Object.assign({}, state, {
        isFetchingLocale: false,
        citationLocale: action.xml
      });
    case "REQUEST_CITATION_STYLE":
      return Object.assign({}, state, {
        isFetchingStyle: true,
        citationStyle: null,
        citationStyleName: "",
        hasFailedCitation: false
      });
    case "RECEIVE_CITATION_STYLE":
      return Object.assign({}, state, {
        isFetchingStyle: false,
        citationStyle: action.xml,
        citationStyleName: action.styleName,
        hasFailedCitation: false
      });
    case "RECEIVE_CITATION_STYLE_LIST":
      return Object.assign({}, state, {
        citationStyleList: action.styleList,
        hasFailedCitationStyleList: false
      });
    case "FAIL_RECEIVE_CITATION_STYLE_LIST":
      return Object.assign({}, state, {
        hasFailedCitationStyleList: true
      });
    case "FAIL_RECEIVE_CITATION_STYLE":
      return Object.assign({}, state, {
        hasFailedCitation: true
      });
    default:
      return state
  }
};

export default citation
