import React from 'react'
import PropTypes from 'prop-types'
import Reference from './Reference'

const ReferenceList = ({ references, library, onReferenceEdit }) => {
  if(library.isFetching) {
    return (
      <div>Retrieving Library...</div>
    )
  } else {
    return (
      <div>
        {references.map(reference => (
          <Reference key={reference.id} {...reference}
                     onEdit={(key, value) => onReferenceEdit(reference.id, key, value)} />
        ))}
      </div>
  );
  }
};

ReferenceList.propTypes = {
  references: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.arrayOf(
        PropTypes.shape({
          family: PropTypes.string,
          given: PropTypes.string
        })
      ),
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  library: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired
  }).isRequired,
  onReferenceEdit: PropTypes.func.isRequired
};

export default ReferenceList
