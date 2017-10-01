import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { dismissCitation } from "../actions/index";
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

let CitationModal = ({ references, citation, dispatch }) => {
  if(citation === undefined ||
    citation.refID === undefined ||
    citation.refID === "") {
    return (<div></div>)
  }

  let ref = references.filter((r) => r.id === citation.refID );
  if(ref.length < 1) {
    return (<div></div>)
  }
  ref = ref[0];

  return (
    <Modal
      isOpen={citation.isVisible}
      onAfterOpen={() => {
      }}
      onRequestClose={() => {
        dispatch(dismissCitation());
      }}
      style={customStyles}
      contentLabel="Citation"
    >
      <p>{ref.title}</p>
    </Modal>
  )
};

CitationModal.propTypes = {
  citation: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired,
    refID: PropTypes.string.isRequired
  })
};

const mapStateToProps = state => {
  return {
    references: state.references,
    citation: state.citation
  }
};

CitationModal = connect(
  mapStateToProps
)(CitationModal);

export default CitationModal
