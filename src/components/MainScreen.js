import React from 'react'
import {connect} from 'react-redux'
import VisibleReferenceList from "../containers/VisibleReferenceList";
import {setFilterText, addReference, saveLibrary, importBibLaTeX} from "../actions"


let MainScreen = ({library, visibilityFilter, dispatch}) => (
  <div>
    <div className="Screen-header">
      <div className="Header-buttons">
        <button type="button" id="addReference" className="input-field" onClick={() => dispatch(addReference())}>
          Add Reference
        </button>
        <label htmlFor="addReference">Add Reference</label>

        <input
          id="importBibLaTeX"
          type="file"
          className="input-field"
          onChange={(e) => {
            e.preventDefault();
            const files = [...e.target.files];
            if (files.length < 1) return;
            const reader = new FileReader();
            reader.onload = (e) => {
              dispatch(importBibLaTeX(e.target.result))
            };
            reader.readAsText(files[0]);
            e.target.value = null;
          }}
        />
        <label htmlFor="importBibLaTeX">Import BibLaTeX</label>

        <button type="button" id="exportLibrary" className="input-field" onClick={() => dispatch(saveLibrary())}>
          Export Library
        </button>
        <label htmlFor="exportLibrary">Export Library</label>
      </div>
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
          defaultValue={ visibilityFilter }
        />
      </div>
    </div>
    <VisibleReferenceList/>
  </div>
);

const mapStateToProps = state => {
  return {
    library: state.library,
    visibilityFilter: state.visibilityFilter
  }
};

MainScreen = connect(
  mapStateToProps
)(MainScreen);

export default MainScreen