import React from 'react'
import PropTypes from 'prop-types'
import Editable from './Editable'

const Reference = ({ onClick, onEdit, completed, isEditing, title }) => (
    <div className="Ref-list-item">
      <div className="Ref-list-item-text">
        <div className="Ref-list-item-text-author">
          Author
        </div>
        <div className="Ref-list-item-text-title"
             onClick={onClick}
             style={{textDecoration: completed ? 'line-through' : 'none'}}>{title}</div>
        <Editable
          value={title}
          onEdit={onEdit}
        />
      </div>
      <div className="Ref-list-item-control">
        <button type="button" onClick={onEdit}>Edit</button>
        <button type="button">Open</button>
        <button type="button">Citation</button>
        <button type="button">Expand</button>
      </div>
    </div>
);

Reference.propTypes = {
  onClick: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default Reference