import React from 'react'
import { connect } from 'react-redux'
import VisibleReferenceList from "../containers/VisibleReferenceList";
import { setFilterText } from "../actions"
import AddReference from '../containers/AddReference'


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
        <AddReference/>
      </div>
    </div>
    <VisibleReferenceList/>
  </div>
);

MainScreen = connect()(MainScreen);

export default MainScreen