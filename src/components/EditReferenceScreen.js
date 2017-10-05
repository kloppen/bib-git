import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { saveEditScreen, cancelEditScreen } from "../actions/index";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import referenceFields from "../common/referenceFields";

const refFields = referenceFields;

const confirmCancel = (dispatch) => {
  confirmAlert({
    title: "Edit Reference",
    message: "Are you sure you want to close without saving?",
    confirmLabel: "Close without saving",
    cancelLabel: "Continue editing",
    onConfirm: () => { dispatch(cancelEditScreen()) },
    onCancel: () => {}
  })
};

const modalContents = (editReferenceScreen) => {
  if(!editReferenceScreen || !editReferenceScreen.referenceEditing) {
    return (<span>No reference specified</span>)
  }
  return refFields.map(
    (rf) =>
      (
        <div key={rf.field} className="Ref-list-item-expand-row">
          <div className="Ref-list-item-expand-left">{rf.field}</div>
          <div className="Ref-list-item-expand-right">
            TEST
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

let EditReferenceScreen = ({ editReferenceScreen, dispatch }) => (
  <div>
    <div className="Screen-header">
      <div className="Header-buttons">
        <button type="button">Save</button>
        <button type="button" onClick={() => { confirmCancel(dispatch) }}>Cancel</button>
      </div>
    </div>
    {
      modalContents(editReferenceScreen)
    }
  </div>
);

EditReferenceScreen = connect(
  mapStateToProps
)(EditReferenceScreen);

EditReferenceScreen.propTypes = {
  editReferenceModal: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired,
    refID: PropTypes.string.isRequired
  })
};

export default EditReferenceScreen
