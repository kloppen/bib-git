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

import thunkMiddleware from 'redux-thunk'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import referenceApp from './reducers'
import App from './components/App'
import './App.css'
import {fetchCitationLocale, fetchLibrary, fetchCitationStyle, getFilePathRoot, fetchCitationStyleList } from "./actions/index";


let store = createStore(
  referenceApp,
  applyMiddleware(
    thunkMiddleware
  )
);

store.dispatch(fetchLibrary());
store.dispatch(fetchCitationStyleList());
store.dispatch(fetchCitationLocale());
store.dispatch(fetchCitationStyle("ieee"));
store.dispatch(getFilePathRoot());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
