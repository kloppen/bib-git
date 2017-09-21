import React from 'react'
import PropTypes from 'prop-types'
import Reference from './Reference'

const ReferenceList = ({ references, onTodoClick }) => (
  <ul>
    {references.map(reference => (
      <Reference key={reference.id} {...reference} onClick={() => onTodoClick(reference.id)} />
    ))}
  </ul>
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
