import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CitationModal from "./CitationModal"
import EditReferenceModal from "./EditReferenceScreen"
import AddReferenceModal from "./AddReferenceModal"
import MainScreen from "./MainScreen"

let App = ({editReferenceScreen}) => {
  return (
    <div className="App">
      <div className="App-header">
        <h2>bib-git</h2>
      </div>
      <CitationModal/>
      <AddReferenceModal/>
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