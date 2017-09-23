import React from 'react'
import Footer from './Footer'
import AddReference from '../containers/AddReference'
import VisibleReferenceList from '../containers/VisibleReferenceList'

const App = () => (
  <div className="App">
    <div className="App-header">
      <h2>bib-git</h2>
      <div className="Search">
        Search: <input type="text" title = "Search" size="40" />
      </div>
      <div className="Header-buttons">
        <button type="button">Load References</button>
        <AddReference />
      </div>
    </div>
    <VisibleReferenceList />
    <Footer />
  </div>
);

export default App