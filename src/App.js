import 'react-tap-event-plugin'; // import for tap events
import React from 'react/addons';
import Base from './Base';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import AppTheme from './theme';
import RaisedButton from 'material-ui/lib/raised-button';
import { AppBar, IconMenu, MenuItem, IconButton } from 'material-ui';
import { Link } from 'react-router';

export default class App extends Base {
  render() {
    return (
      <div>
        <AppBar
          title="Title"/>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/reward">Reward</Link>
        <Link to="/driver">Driver</Link>
      </div>
    );
  }
}
