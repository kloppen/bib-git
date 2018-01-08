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

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  saveEditScreen,
  dismissEditScreen,
  editReferenceField,
  editNameField,
  addName,
  removeName,
  IDErrorEditScreen,
  editFileField,
  removeFile,
  addFile
} from "../actions/index";
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import referenceFields from "../common/referenceFields";
import Editable from "./Editable"
import DateEdit from "./DateEdit"
import EditableNameList from "./EditableNameList"
import FileList from "./FileList"
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import ReactTooltip from 'react-tooltip'

const refFields = referenceFields;

const allowableTypes = [
  "article",
  "article-magazine",
  "article-newspaper",
  "article-journal",
  "bill",
  "book",
  "broadcast",
  "chapter",
  "dataset",
  "entry",
  "entry-dictionary",
  "entry-encyclopedia",
  "figure",
  "graphic",
  "interview",
  "legislation",
  "legal_case",
  "manuscript",
  "map",
  "motion_picture",
  "musical_score",
  "pamphlet",
  "paper-conference",
  "patent",
  "post",
  "post-weblog",
  "personal_communication",
  "report",
  "review",
  "review-book",
  "song",
  "speech",
  "thesis",
  "treaty",
  "webpage"
];

const confirmCancel = (dispatch) => {
  confirmAlert({
    title: "Edit Reference",
    message: "Are you sure you want to close without saving?",
    confirmLabel: "Close without saving",
    cancelLabel: "Continue editing",
    onConfirm: () => { dispatch(dismissEditScreen()) },
    onCancel: () => { /* Do nothing on cancel, just let alert go away */}
  })
};

const IDError = (dispatch) => (
  <ReactConfirmAlert
    title="Edit Reference"
    message="You have entered an invalid ID or one that is assigned to another item. Please change it."
    confirmLabel="OK"
    cancelLabel=""
    onConfirm={() => { dispatch(IDErrorEditScreen(false)) }}
    onCancel={() => { /* Do nothing on cancel, just let, alert go away */}}
  />
);

const fieldContents = (editReferenceScreen, reference, library, field, dispatch) => {
  switch (field.type) {
    case "TEXT_AREA":
      return (
        <Editable
          value={reference[field.field]}
          field={field.field}
          isTextArea={true}
          onEdit={(field, value) => {
            dispatch(editReferenceField(field, value))
          }}
        />
      );
    case "NAME":
      return (
        <EditableNameList
          field={field.field}
          nameList={reference[field.field]}
          isEditable={true}
          onEditNameField={(index, key, value) => {
            dispatch(editNameField(field.field, index, key, value))
          }}
          onAddName={() => {
            dispatch(addName(field.field))
          }}
          onDeleteName={(index) => {
            dispatch(removeName(field.field, index))
          }}
        />
      );
    case "FILE":
      return (
        <FileList
          files={reference[field.field]}
          onEditFileField={(index, value) => {
            dispatch(editFileField(field.field, index, value))
          }}
          onDeleteFile={(index) => {
            dispatch(removeFile(field.field, index))
          }}
          onAddFile={(file) => {
            dispatch(addFile(field.field, file))
          }}
          allowableFileList={editReferenceScreen.fileList}
          hrefRoot={library.hrefRoot}
        />
      );
    case "DATE":
      return (
        <DateEdit
          value={reference[field.field]}
          field={field.field}
          onEdit={(field, value) => {
            dispatch(editReferenceField(field, value))
          }}
        />
      );
    case "TYPE":
      return (
        <Select
            name="typePicker"
            value={reference[field.field]}
            options={
              allowableTypes
                .map(t =>
                  ({value: t, label: t}))
            }
            onChange={value => {
              dispatch(editReferenceField(field.field, !!value ? value.value : ""))
            }}
          />
      );
    default:
      return (
        <Editable
          value={reference[field.field]}
          field={field.field}
          isTextArea={false}
          onEdit={(field, value) => {
            dispatch(editReferenceField(field, value))
          }}
        />
      );
  }
};

const modalContents = (editReferenceScreen, library, dispatch) => {
  if(!editReferenceScreen || !editReferenceScreen.referenceEditing) {
    return (<span>No reference specified</span>)
  }

  return refFields.map(
    (rf) =>
      (
        <div key={rf.field} className="Ref-list-item-expand-row">
          <div
            className="Ref-list-item-expand-left"
            data-tip={rf.hint}
          >{rf.field}</div>
          <div className="Ref-list-item-expand-right">
            { fieldContents(editReferenceScreen, editReferenceScreen.referenceEditing, library, rf, dispatch) }
          </div>
        </div>
      )
  )
};

const mapStateToProps = state => {
  return {
    editReferenceScreen: state.editReferenceScreen,
    library: state.library
  }
};

let EditReferenceScreen = ({editReferenceScreen, library, dispatch}) => (
  <div>
    <ReactTooltip />
    <div className="Screen-header">
      <div className="Header-buttons">
        <button type="button"
                onClick={() => {
                  dispatch(saveEditScreen())
                }}
        >Save</button>
        <button type="button"
                onClick={() => {
                  if(editReferenceScreen.isModified) {
                    confirmCancel(dispatch)
                  } else {
                    dispatch(dismissEditScreen())
                  }
                }}
        >Cancel</button>
      </div>
    </div>
    <span>
      {
        editReferenceScreen.hasFailedUpdatedReference
          ? (<div className="Error">Failed to update reference on server</div>)
          : (<span/>)
      }
    </span>
    <span>
      {editReferenceScreen.isShowingIDError
        ? IDError(dispatch)
        : <span/>
      }
    </span>
    <div className="Ref-list-item">
      { modalContents(editReferenceScreen, library, dispatch) }
    </div>
  </div>
);

EditReferenceScreen = connect(
  mapStateToProps
)(EditReferenceScreen);

EditReferenceScreen.propTypes = {
  editReferenceModal: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired,
    refID: PropTypes.string.isRequired,
    isModified: PropTypes.bool.isRequired
  })
};

export default EditReferenceScreen
