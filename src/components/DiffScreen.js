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

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  saveDiffScreen,
  dismissDiffScreen,
  diffUseLocal,
  diffUseRemote,
  diffUseReset
} from "../actions/index";
import { field_contents } from '../common/field_contents';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import referenceFields from "../common/referenceFields";
import 'react-select/dist/react-select.css';
import ReactTooltip from 'react-tooltip'

const refFields = referenceFields;

const confirmCancel = (dispatch) => {
  confirmAlert({
    title: "Diff",
    message: "Are you sure you want to close without saving?",
    confirmLabel: "Close without saving",
    cancelLabel: "Continue merging diff",
    onConfirm: () => { dispatch(dismissDiffScreen()) },
    onCancel: () => { /* Do nothing on cancel, just let alert go away */}
  })
};

const blankContents = () => (
  <div className="Ref-list-item-expand-row"></div>
)

const getFieldDisplayContents = (diff_item, rf, anti_use) => {
  const value = diff_item[rf.field].use === anti_use ?
    diff_item[rf.field][anti_use] :
    diff_item[rf.field][anti_use === "local" ? "remote" : "local"];
  return !value ?
    blankContents() :
    field_contents(rf, value, /*RE=*/null, /*hrefRoot=*/"")
};

const singleDiffContents = (diff_item, dispatch) => {
  const cur_id = !!diff_item["id"].local ?
    diff_item["id"].local : diff_item["id"].remote;

  const diff_fields = Object.keys(diff_item);
  return refFields.filter(
    rf => diff_fields.includes(rf.field)
  ).map(
    rf => (
      <div class={!diff_item[rf.field].is_different ?
                  "Diff-row" :
                  diff_item[rf.field].use === "local" ?
                  "Diff-row-use-local" :
                  diff_item[rf.field].use === "remote" ?
                  "Diff-row-use-remote" :
                  "Diff-row-different"}>
        <div class="Diff-remote">
          { getFieldDisplayContents(diff_item, rf, "local") }
        </div>
        <button type="button"
                disabled={!diff_item[rf.field].is_different}
                onClick={() => {
                  dispatch(diffUseLocal(cur_id, rf.field))
                }}
        >&lt;</button>
        <button type="button"
                disabled={!diff_item[rf.field].is_different}
                onClick={() => {
                  dispatch(diffUseReset(cur_id, rf.field))
                }}
        >Reset</button>
        <button type="button"
                disabled={!diff_item[rf.field].is_different}
                onClick={() => {
                  dispatch(diffUseRemote(cur_id, rf.field))
                }}
        >&gt;</button>
        <div class="Diff-local">
          { getFieldDisplayContents(diff_item, rf, "remote") }
        </div>
      </div>
    )
  );
};

const diffListContents = (diffScreen, dispatch) => {
  if(!diffScreen || !diffScreen.diff || !diffScreen.diff.length) {
    return (<span>No diff provided</span>);
  }

  return diffScreen.diff.map(
    diff_item => (
      <div class="Ref-list-item">
        { singleDiffContents(diff_item, dispatch) }
      </div>
    )
  )
};

const mapStateToProps = state => {
  return {
    diffScreen: state.diffScreen,
    diff: state.diff
  }
};

let DiffScreen = ({diffScreen, dispatch}) => (
  <div>
    <ReactTooltip />
    <div className="Screen-header">
      <div className="Header-buttons">
        <button type="button"
                onClick={() => {
                  dispatch(saveDiffScreen())
                }}
        >Save</button>
        <button type="button"
                onClick={() => {
                  if(diffScreen.isModified) {
                    confirmCancel(dispatch)
                  } else {
                    dispatch(dismissDiffScreen())
                  }
                }}
        >Cancel</button>
      </div>
    </div>
    <span>
      {
        diffScreen.hasFailedSaveDiff
          ? (<div className="Error">Failed to save diff</div>)
          : (<span/>)
      }
    </span>
    <div className="Ref-list-item">
        <div class="Diff-remote">Remote</div>
        <div class="Diff-local">Local</div>
      { diffListContents(diffScreen, dispatch) }
    </div>
  </div>
);

DiffScreen = connect(
  mapStateToProps
)(DiffScreen);

DiffScreen.propTypes = {
  diffScreenModal: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired,
    isModified: PropTypes.bool.isRequired
  })
};

export default DiffScreen
