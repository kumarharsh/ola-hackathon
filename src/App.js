import 'react-tap-event-plugin'; // import for tap events
import React, { Component } from 'react';

import RaisedButton from 'material-ui/lib/raised-button';
import { AppBar, IconMenu, MenuItem, IconButton } from 'material-ui';
import { Link } from 'react-router';

export default class App extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="Title"
          iconElementRight={UserMenu} />
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    );
  }
}
