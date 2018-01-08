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
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CitationModal from "./CitationModal"
import EditReferenceModal from "./EditReferenceScreen"
import MainScreen from "./MainScreen"

let App = ({editReferenceScreen}) => {
  return (
    <div className="App">
      <div className="App-header">
        <h2>bib-git</h2>
      </div>
      <CitationModal/>
      {editReferenceScreen.isVisible ?
        (<EditReferenceModal/>) :
        (<MainScreen/>)
      }
    </div>
  );
};

const mapStateToProps = state => {

  return {
    editReferenceScreen: state.editReferenceScreen
  }
};

App = connect(
  mapStateToProps
)(App);

App.propTypes = {
  editReferenceScreen: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired
  })
};

export default App
