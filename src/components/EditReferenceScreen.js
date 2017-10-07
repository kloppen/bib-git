import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  saveEditScreen,
  cancelEditScreen,
  editReferenceField,
  editNameField,
  addName,
  removeName
} from "../actions/index";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import referenceFields from "../common/referenceFields";
import Editable from "./Editable"
import NameList from "./NameList"

const refFields = referenceFields;

const confirmCancel = (dispatch) => {
  confirmAlert({
    title: "Edit Reference",
    message: "Are you sure you want to close without saving?",
    confirmLabel: "Close without saving",
    cancelLabel: "Continue editing",
    onConfirm: () => { dispatch(cancelEditScreen()) },
    onCancel: () => { /* Do nothing on cancel, just let alert go away */}
  })
};

const fieldContents = (reference, field, dispatch) => {
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
        <NameList
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

const modalContents = (editReferenceScreen, dispatch) => {
  if(!editReferenceScreen || !editReferenceScreen.referenceEditing) {
    return (<span>No reference specified</span>)
  }

  return refFields.map(
    (rf) =>
      (
        <div key={rf.field} className="Ref-list-item-expand-row">
          <div className="Ref-list-item-expand-left">{rf.field}</div>
          <div className="Ref-list-item-expand-right">
            { fieldContents(editReferenceScreen.referenceEditing, rf, dispatch) }
          </div>
        </div>
      )
  )
};

const mapStateToProps = state => {
  return {
    editReferenceScreen: state.editReferenceScreen
  }
};

let EditReferenceScreen = ({editReferenceScreen, dispatch}) => (
  <div>
    <div className="Screen-header">
      <div className="Header-buttons">
        <button type="button"
                onClick={() => {
                  if(editReferenceScreen.isModified) {
                    dispatch(saveEditScreen())
                  }
                }}
        >Save</button>
        <button type="button"
                onClick={() => {
                  if(editReferenceScreen.isModified) {
                    confirmCancel(dispatch)
                  } else {
                    dispatch(cancelEditScreen())
                  }
                }}
        >Cancel</button>
      </div>
    </div>
    <div className="Ref-list-item">
      { modalContents(editReferenceScreen, dispatch) }
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
