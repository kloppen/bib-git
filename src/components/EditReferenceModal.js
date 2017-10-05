import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { saveEditModal, cancelEditModal } from "../actions/index";
import Modal from 'react-modal';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import editReferenceModal from "../reducers/editReferenceModal";
import referenceFields from "../common/referenceFields";

const refFields = referenceFields;

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    overflow: 'scroll'
  }
};

const confirmClose = (dispatch) => {
  confirmAlert({
    title: "Edit Reference",
    message: "Are you sure you want to close without saving?",
    confirmLabel: "Close without saving",
    cancelLabel: "Continue editing",
    onConfirm: () => { dispatch(cancelEditModal()) },
    onCancel: () => {}
  })
};

const modalContents = (editReferenceModal) => {
  if(!editReferenceModal || !editReferenceModal.referenceEditing) {
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

let EditReferenceModal = ({ editReferenceModal, dispatch }) => (
  <Modal
    isOpen={editReferenceModal.isVisible}
    onAfterOpen={() => {
    }}
    onRequestClose={() => {
      confirmClose(dispatch)
    }}
    style={customStyles}
    contentLabel="Edit Reference"
  >
    <div>{modalContents(editReferenceModal)}</div>
  </Modal>
);

EditReferenceModal.propTypes = {
  editReferenceModal: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired,
    refID: PropTypes.string.isRequired
  })
};

const mapStateToProps = state => {

  return {
    editReferenceModal: state.editReferenceModal
  }
};

EditReferenceModal = connect(
  mapStateToProps
)(EditReferenceModal);

export default EditReferenceModal
