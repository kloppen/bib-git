import React from 'react'
import PropTypes from 'prop-types'

const Reference = ({ onClick, completed, title }) => (
  <div className="Ref-list-item">
    <div className="Ref-list-item-text">
      <div className="Ref-list-item-text-author">Author</div>
      <div className="Ref-list-item-text-title"
           onClick={onClick}
           style={{textDecoration: completed ? 'line-through': 'none'}}>{title}</div>
    </div>
    <div className="Ref-list-item-control">
      <button type="button">Open</button>
      <button type="button">Citation</button>
      <button type="button">Expand</button>
    </div>
  </div>
);

Reference.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default Reference