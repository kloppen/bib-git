import React from 'react'
import Footer from './Footer'
import AddReference from '../containers/AddReference'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div className="App">
    <div className="App-header">
    </div>
    <AddReference />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App