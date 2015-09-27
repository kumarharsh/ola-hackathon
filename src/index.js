import React from 'react';
import App from './App';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Reward from './components/Reward';
import Feedback from './components/Feedback';
import Driver from './components/Driver';
import Profile from './components/Profile';
import Schedule from './components/Schedule';

import { Router, Route, Redirect, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import OlaApi from './Services/OlaApi';
import fetch from 'isomorphic-fetch';
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

// try login
OlaApi.client = new OlaApi.init({
  client_id: 'YzcwZjI1MGEtZDExMC00Nzc3LTk4MTYtNTY4MTc4NTViMWNj',
  redirect_uri: 'http://localhost/team34&scope=profile%20booking&state=state123',
});

function requireAuth(nextState, replaceState) {
  if (!OlaApi.isLoggedIn()) {
    console.log('Please Login')
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  } else {
    console.log('Already Logged in')
    setInterval(function() {
      OlaApi.client.api('/v1/bookings/track_ride', 'GET')
      .then(function(data){
        return data.json()
      })
      .then(function(data){
        console.log(data)
         if(data.booking_status === 'COMPLETED') {
          fetch('/end_ride', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(() => {
            // this.props = {}
            history.replaceState(null, '/feedback') // TODO change route
          })
        }
      });
    }, 5000);
  }
}

function logout(nextState, replaceState) {
  OlaApi.client.logout();
  replaceState({ nextPathname: nextState.location.pathname }, '/login');
}

class Logout extends React.Component {
  render() {
    return <div></div>;
  }
}

React.render(
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App} onEnter={requireAuth}>
      <Redirect from="/team34" to="/" />
      {/* authorized routes */}
      <Route path="/" component={Dashboard}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/schedule" component={Schedule}/>
      <Route path="/profile" component={Profile} />
      <Route path="/logout" component={Logout} onEnter={logout} />
    </Route>
    <Route path="/feedback" component={Feedback} />
    <Route path="/reward" component={Reward} />
    <Route path="/driver" component={Driver} />
    <Route path="/login" component={Login} />
  </Router>,
  document.getElementById('root')
);
