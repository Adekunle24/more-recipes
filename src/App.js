import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import {Provider} from 'react-redux';
import Store from './store/index';

render(
    <Provider store={Store}>
    <Router>
    <Route exact to="/" component={Home} />
    </Router>
    </Provider>
  , document.getElementById('app')
);
