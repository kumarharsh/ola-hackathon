import React from 'react';
import App from './App';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Router, Route, Redirect } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import OlaApi from './Services/OlaApi';

function requireAuth(nextState, replaceState) {
  if (!OlaApi.isLoggedIn()) {
    // try login
    var olaClient = OlaApi.init({
      client_id: 'YzcwZjI1MGEtZDExMC00Nzc3LTk4MTYtNTY4MTc4NTViMWNj',
      redirect_uri: 'http://localhost/team34&scope=profile%20booking&state=state123',
    });

    if (!OlaApi.isLoggedIn()) { // still not logged in redirect to login page
      replaceState({ nextPathname: nextState.location.pathname }, '/login');
    }
  }
}

React.render(
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App} onEnter={requireAuth}>
      <Redirect from="/team34" to="/" />
      {/* authorized routes */}
      <Route path="/dashboard" component={Dashboard} />
    </Route>
    <Route path="/login" component={Login} />
  </Router>,
  document.getElementById('root')
);
