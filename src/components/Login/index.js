import 'react-tap-event-plugin'; // import for tap events
import React from 'react';
import Base from '../../Base';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import AppTheme from '../../theme';
import { AppBar, RaisedButton } from 'material-ui';
import { OLA, others } from '../../colors';
import { OlaApi } from '../../Services/OlaApi';

export default class Login extends Base {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(AppTheme),
    };
  }
  render() {
    return (
      <div style={{height:'100vh', width:'100vw', backgroundColor: OLA, display:'flex', flexDirection:'column', alignItems:'center', color:others.white, textAlign:'center'}}>
        <div style={{flex:'1 0 auto', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
          <img src="/public/assets/logo.png" height="100" alt="MyOla"/>
          <div style={{margin:'2rem 6rem'}}>Now, get even more out of your OLA! Ride more often and enjoy the red-velvet treatment you deserve!</div>
          <RaisedButton
            label="Login With Ola"
            linkButton={true}
            href="http://sandbox-t.olacabs.com/oauth2/authorize?response_type=token&client_id=YzcwZjI1MGEtZDExMC00Nzc3LTk4MTYtNTY4MTc4NTViMWNj&redirect_uri=http://localhost/team34&scope=profile%20booking&state=state123"/>
        </div>
        <div style={{flex:'0 1 auto', paddingBottom:'1rem'}}>
          By <img src="/public/assets/logo-playlyfe-256-white.png" height="32" alt="Playlyfe" style={{verticalAlign:'-8px'}}/>
        </div>
      </div>
    );
  }
}

Login.childContextTypes = {
  muiTheme: React.PropTypes.object,
};
