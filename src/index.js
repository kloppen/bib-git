import thunkMiddleware from 'redux-thunk'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import referenceApp from './reducers'
import App from './components/App'
import './App.css'
import { fetchLibrary } from "./actions/index";


let store = createStore(
  referenceApp,
  applyMiddleware(
    thunkMiddleware
  )
);

store.dispatch(fetchLibrary());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
