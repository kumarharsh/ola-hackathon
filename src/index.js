import React from 'react';
import App from './App';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

React.render(
  <Router history={createBrowserHistory()}>
    <Route path="/team34" component={App} />
    <Route path="/" component={App} />
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
  </Router>,
  document.getElementById('root')
);
