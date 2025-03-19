// Copyright (C) 2025, Stefan Kloppenborg
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

const setUse = (state, action, use) => {
  const cur_id = action.id;
  const cur_field = action.field;
  const new_diff = state.diff.map(diff_item => {
    let new_diff_item = Object.assign({}, diff_item);
    if(new_diff_item.id.local === cur_id ||
      new_diff_item.id.remote === cur_id) {
        new_diff_item[cur_field].use = use;
    }
    return new_diff_item;
  });

  const is_modified = new_diff.map(diff_item => {
    return Object.entries(diff_item).map(([_, field]) => {
      return field.use !== "";
    }).some(v => v)
  }).some(v => v);

  console.log(is_modified);

  return Object.assign({}, state, {
    diff: new_diff,
    isModified: is_modified
  });
};

const diffScreen = (state = {
                               isVisible: false,
                               isModified: false,
                               hasFailedSaveDiff: false,
                               diff: []
                             },
                             action) => {
  switch (action.type) {
    case "SHOW_DIFF_SCREEN":
      return Object.assign({}, state, {
        isVisible: true,
        isModified: false,
        hasFailedSaveDiff: false,
        diff: action.diff
      });
    case "DISMISS_DIFF_SCREEN":
      return Object.assign({}, state, {
        isVisible: false,
        isModified: false,
        hasFailedSaveDiff: false,
        diff: []
      });
    case "DIFF_USE_LOCAL":
      return setUse(state, action, "local");
    case "DIFF_USE_REMOTE":
      return setUse(state, action, "remote");
    case "DIFF_USE_RESET":
      return setUse(state, action, "");
    case "FAIL_SAVE_DIFF":
      return Object.assign({}, state, {
        hasFailedSaveDiff: true
      });
    default:
      return state
  }
};

export default diffScreen;
