import 'react-tap-event-plugin'; // import for tap events
import React from 'react';
import Base from '../../Base';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import AppTheme from '../../theme';
import { AppBar, RaisedButton } from 'material-ui';
import { OLA } from '../../colors';
import { OlaApi } from '../../Services/OlaApi';

export default class Login extends Base {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(AppTheme),
    };
  }
  render() {
    return (
      <div style={{height:'100vh', width:'100vw', backgroundColor: OLA, display:'flex', justifyContent:'center', alignItems:'center'}}>
        <RaisedButton
          label="Login With Ola"
          linkButton={true}
          href="http://sandbox-t.olacabs.com/oauth2/authorize?response_type=token&client_id=YzcwZjI1MGEtZDExMC00Nzc3LTk4MTYtNTY4MTc4NTViMWNj&redirect_uri=http://localhost/team34&scope=profile%20booking&state=state123"
        />
      </div>
    );
  }
}

Login.childContextTypes = {
  muiTheme: React.PropTypes.object,
};
