import React from 'react'
import { connect } from 'react-redux'
import { addReference } from '../actions'

let AddReference = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return
          }
          dispatch(addReference(input.value));
          input.value = ''
        }}
      >
        <input
          ref={node => {
            input = node
          }}
        />
        <button type="submit">
          Add Reference
        </button>
      </form>
    </div>
  )
};
AddReference = connect()(AddReference);

export default AddReference
