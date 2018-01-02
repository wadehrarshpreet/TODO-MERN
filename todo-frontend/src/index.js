import 'babel-polyfill'; //for old browser compatible
import React from 'react';
import ReactDOM from "react-dom";
import { Router, Switch, Route } from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import {Provider} from 'react-redux';
import AppLayout from './Layouts/AppLayout';
import createBrowserHistory from 'history/createBrowserHistory'
import Reducers from './Reducers/index.js';
import ReduxThunk from 'redux-thunk'
const newHistory = createBrowserHistory();
const store = createStore(Reducers, applyMiddleware(ReduxThunk, promise));

import { createHashHistory } from 'history'

// create history
const history = createHashHistory({
  basname: '',
  hashType: 'slash'
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
	     <AppLayout />
    </Router>
  </Provider>
, document.getElementById("root"));
