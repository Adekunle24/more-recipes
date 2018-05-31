import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import {Provider} from 'react-redux';
import Store from './store/index';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

render(
    <Provider store={Store}>
    <Router>
    <div>
    <PublicRoute/>
    <PrivateRoute/>
    </div>
    </Router>
    </Provider>
  , document.getElementById('app')
);
