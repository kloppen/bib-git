import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { dismissAddReferenceModal, getReferenceByString } from "../actions/index";
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

let AddReferenceModal = ({ addReference, dispatch }) => (
  <Modal
    isOpen={addReference.isVisible}
    onAfterOpen={() => {
    }}
    onRequestClose={() => {
      dispatch(dismissAddReferenceModal());
    }}
    style={customStyles}
    contentLabel="Add Reference"
  >
    <div className="Add-reference-modal-row">
      Add by DOI:
      <input
        type="text"
        title="DOI"
        onChange={(e) => {
          dispatch(getReferenceByString(e.target.value))
        }}
      />
      <button
        onClick={() => {
          dispatch(getReferenceByString())
        }}
      >Search DOI
      </button>
    </div>
    <div className="Add-reference-modal-row">
      <button>Add Blank Reference</button>
    </div>
  </Modal>
);

AddReferenceModal.propTypes = {
  addReference: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired,
  })
};

const mapStateToProps = state => {
  return {
    addReference: state.addReference
  }
};

AddReferenceModal  = connect(
  mapStateToProps
)(AddReferenceModal );

export default AddReferenceModal