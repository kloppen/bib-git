import React from 'react'
import { connect } from 'react-redux'
import { addRef } from '../actions'

let AddRef = ({ dispatch }) => {
  let input;

  return (
    <form onSubmit={event => {
      event.preventDefault();
      if (!input.value.trim()) {
        return
      }
      dispatch(addRef(input.value));
      input.value = '';
    }}
    >
      <input
        ref={node => {
          input = node
        }}
      />
      <button type="submit">New Reference</button>
    </form>
  );
};

AddRef = connect()(AddRef);

export default AddRef
