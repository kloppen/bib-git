// Copyright (C) 2017, Stefan Kloppenborg
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
