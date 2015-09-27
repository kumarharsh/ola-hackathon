import React from 'react';
import App from './App';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Reward from './components/Reward';
import Share from './components/Share';
import Driver from './components/Driver';

import { Router, Route, Redirect } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import OlaApi from './Services/OlaApi';
import fetch from 'isomorphic-fetch';

let injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

function requireAuth(nextState, replaceState) {
  if (!OlaApi.isLoggedIn()) {
    // try login
    var olaClient = OlaApi.init({
      client_id: 'YzcwZjI1MGEtZDExMC00Nzc3LTk4MTYtNTY4MTc4NTViMWNj',
      redirect_uri: 'http://localhost/team34&scope=profile%20booking&state=state123',
    });
    if (!OlaApi.isLoggedIn()) { // still not logged in redirect to login page
      console.log('Please Login')
      replaceState({ nextPathname: nextState.location.pathname }, '/login');
    } else {
      console.log('Already Logged in')
      setInterval(function() {
        OlaApi.api('/v1/bookings/track_ride', 'GET')
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
               history.replaceState(null, '/reward') // TODO change route
            })
          }
        })
      }, 5000)
    }
  }
}

React.render(
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App} onEnter={requireAuth}>
      <Redirect from="/team34" to="/" />
      {/* authorized routes */}
      <Route path="/dashboard" component={Dashboard} />

      <Route path="/share" component={Share} />
    </Route>
    <Route path="/reward" component={Reward} />
    <Route path="/driver" component={Driver} />
    <Route path="/login" component={Login} />
  </Router>,
  document.getElementById('root')
);
