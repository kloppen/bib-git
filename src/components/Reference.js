import React from 'react'
import PropTypes from 'prop-types'
import Editable from './Editable'

const Reference = ({ onClick, onEdit, completed, isEditing, author, title }) => (
    <div className="Ref-list-item">
      <div className="Ref-list-item-text">
        <div className="Ref-list-item-text-author">
          <Editable
            value="author"
            onEdit={(value) => onEdit("author", value)}
          />
        </div>
        <div className="Ref-list-item-text-title"
             onClick={onClick}
             style={{textDecoration: completed ? 'line-through' : 'none'}}>{title}</div>
        <div className="Ref-list-item-text-title">
          <Editable
            value={title}
            onEdit={(value) => onEdit("title", value)}
          />
        </div>
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
  onEdit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default Reference