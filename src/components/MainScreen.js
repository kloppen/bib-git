import React from 'react'
import {connect} from 'react-redux'
import VisibleReferenceList from "../containers/VisibleReferenceList";
import {setFilterText, addReference, saveReferences} from "../actions"

let MainScreen = ({dispatch}) => (
  <div>
    <div className="Screen-header">
      <div className="Search">
        Search:
        <input
          type="text"
          title="Search"
          size="40"
          onChange={
            (event) => {
              dispatch(setFilterText(event.target.value));
            }
          }
        />
      </div>
      <div className="Header-buttons">
        <button type="button" onClick={() => dispatch(addReference())}>
          Add Reference
        </button>
        <button type="button" onClick={() => dispatch(saveReferences())}>
          Save Library
        </button>
      </div>
    </div>
    <VisibleReferenceList/>
  </div>
);

MainScreen = connect()(MainScreen);

export default MainScreen