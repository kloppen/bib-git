import React from 'react'
import PropTypes from 'prop-types'
import Reference from './Reference'

const ReferenceList = ({ references, library }) => {
  if(library.isFetching) {
    return (
      <div>Retrieving Library...</div>
    )
  } else {
    return (
      <div>
        {references.map(reference => (
          <Reference key={reference.id} {...reference} />
        ))}
      </div>
    );
  }
};

ReferenceList.propTypes = {
  references: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  library: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired
  }).isRequired
};

export default ReferenceList
