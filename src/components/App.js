import React from 'react'
import Footer from './Footer'
import AddReference from '../containers/AddReference'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <AddReference />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App