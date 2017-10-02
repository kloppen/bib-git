import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { dismissCitation } from "../actions/index";
import Modal from 'react-modal';

const CSL = require("citeproc");

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

const modalContents = (references, citation) => {
  if(citation === undefined ||
    citation.refID === undefined ||
    citation.refID === "") {
    return (<span>No reference specified</span>)
  }

  if(citation.isFetchingLocale) {
    return (<span>Fetching Citation Locale, please wait...</span>)
  }

  if(citation.isFetchingStyle) {
    return (<span>Fetching Citation Style, please wait...</span>)
  }

  let ref = references.filter((r) => r.id === citation.refID );
  if(ref.length < 1) {
    return (<span>Reference not found</span>)
  }

  const citeprocSys = {
    retrieveLocale: (lang) => citation.citationLocale,
    retrieveItem: (id) => references.filter((r) => r.id === id )[0]
  };

  const citeproc = new CSL.Engine(citeprocSys, citation.citationStyle);
  const itemIDs = [];
  itemIDs.push(citation.refID);
  citeproc.updateItems(itemIDs);
  const bibEntry = citeproc.makeBibliography();

  return (<span dangerouslySetInnerHTML={{__html: bibEntry[1]}} />)
};

let CitationModal = ({ references, citation, dispatch }) => (
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
    <div>{ modalContents(references, citation) }</div>
  </Modal>
);

CitationModal.propTypes = {
  citation: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired,
    refID: PropTypes.string.isRequired,
    citationLocale: PropTypes.string,
    citationStyle: PropTypes.string
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
