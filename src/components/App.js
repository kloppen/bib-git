import React from 'react'
import { connect } from 'react-redux'
import AddReference from '../containers/AddReference'
import VisibleReferenceList from '../containers/VisibleReferenceList'
import { setFilterText } from "../actions"

let App = ({dispatch}) => {
  return (
    <div className="App">
      <div className="App-header">
        <h2>bib-git</h2>
        <div className="Search">
          Search:
          <input
            type="text"
            title = "Search"
            size="40"
            onChange={
              (event) => {
                dispatch(setFilterText(event.target.value));
              }
            }
          />
        </div>
        <div className="Header-buttons">
          <AddReference />
        </div>
      </div>
      <VisibleReferenceList />
    </div>
  );
};

App= connect()(App);

export default App