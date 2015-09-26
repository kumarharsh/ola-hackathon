import React from 'react';
import App from './App';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Router, Route } from 'react-router';

React.render(
  <Router>
    <Route path="/" component={App} />
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
  </Router>,
  document.getElementById('root')
);
