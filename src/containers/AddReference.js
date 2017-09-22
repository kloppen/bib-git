import React from 'react'
import { connect } from 'react-redux'
import { addReference } from '../actions'

let AddReference = ({ dispatch }) => {

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch(addReference());
        }}
      >
        <button type="submit">
          Add Reference
        </button>
      </form>
    </div>
  )
};
AddReference = connect()(AddReference);

export default AddReference
