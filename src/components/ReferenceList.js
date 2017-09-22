import React from 'react'
import PropTypes from 'prop-types'
import Reference from './Reference'

const ReferenceList = ({ references, onTodoClick }) => (
  <div>
    {references.map(reference => (
      <Reference key={reference.id} {...reference} onClick={() => onTodoClick(reference.id)} />
    ))}
  </div>
);

ReferenceList.propTypes = {
  references: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired
};

export default ReferenceList
