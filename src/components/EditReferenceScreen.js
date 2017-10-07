import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  saveEditScreen,
  cancelEditScreen,
  editReferenceField,
  editAuthorField,
  addAuthorEditScreen,
  removeAuthorEditScreen
} from "../actions/index";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import referenceFields from "../common/referenceFields";
import Editable from "./Editable"
import AuthorList from "./AuthorsList"

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

const authorContents = (editReferenceScreen, dispatch) => {
  if(!editReferenceScreen || !editReferenceScreen.referenceEditing) {
    return (<span>No reference specified</span>)
  }

  const ref = editReferenceScreen.referenceEditing;

  return (
    <div key="author" className="Ref-list-item-expand-row">
      <div className="Ref-list-item-expand-left">author</div>
      <div className="Ref-list-item-expand-right">
        <AuthorList
          authorList={ref.author}
          isEditable={true}
          onEditAuthorField={(index, key, value) => {
            dispatch(editAuthorField(index, key, value))
          }}
          onAddAuthor={() => {
            dispatch(addAuthorEditScreen())
          }}
          onDeleteAuthor={(index) => {
            dispatch(removeAuthorEditScreen(index))
          }}
        />
      </div>
    </div>
  )
};

const modalContents = (editReferenceScreen, dispatch) => {
  if(!editReferenceScreen || !editReferenceScreen.referenceEditing) {
    return (<span>No reference specified</span>)
  }

  const ref = editReferenceScreen.referenceEditing;

  return refFields.map(
    (rf) =>
      (
        <div key={rf.field} className="Ref-list-item-expand-row">
          <div className="Ref-list-item-expand-left">{rf.field}</div>
          <div className="Ref-list-item-expand-right">
            <Editable
              value={ref[rf.field]}
              field={rf.field}
              isTextArea={!!rf.isTextArea}
              onEdit={(field, value) => {
                dispatch(editReferenceField(field, value))
              }}
            />
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
      <span>{ authorContents(editReferenceScreen, dispatch) }</span>
      <span>
        { modalContents(editReferenceScreen, dispatch) }
      </span>
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
