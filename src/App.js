import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import {Provider} from 'react-redux';
import Store from './store/index';
import AuthHome from './components/Auth/index';

render(
    <Provider store={Store}>
    <Router>
    <div>
    <Route exact path="/" component={Home} />
    <Route path="/home" component={AuthHome} />
    </div>
    </Router>
    </Provider>
  , document.getElementById('app')
);
