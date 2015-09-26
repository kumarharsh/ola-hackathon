import React, { Component } from 'react/addons';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import AppTheme from './theme';

export default class Base extends Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(AppTheme),
    };
  }
}
Base.childContextTypes = {
  muiTheme: React.PropTypes.object
}