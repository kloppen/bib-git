import React from 'react'
import PropTypes from 'prop-types'
import '../App.css'

const Ref = ({title}) => (
  <div className="Ref-list-item">
    <div className="Ref-list-item-text">
      <div className="Ref-list-item-text-author">Author</div>
      <div className="Ref-list-item-text-title">{title}</div>
    </div>
    <div className="Ref-list-item-control">
      <button type="button">Open</button>
      <button type="button">Citation</button>
      <button type="button">Expand</button>
    </div>
  </div>
);

Ref.propTypes = {
  text: PropTypes.string.isRequired
}

export default Ref
