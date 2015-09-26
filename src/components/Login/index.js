import 'react-tap-event-plugin'; // import for tap events
import React, { Component } from 'react';

import { AppBar, RaisedButton } from 'material-ui';

export default class Login extends Component {
  render() {
    return (
      <div>
        <AppBar title="Login"/>
        <RaisedButton label="Login With Ola" linkButton={true} href="http://sandbox-t.olacabs.com/oauth2/authorize?response_type=token&client_id=YzcwZjI1MGEtZDExMC00Nzc3LTk4MTYtNTY4MTc4NTViMWNj&redirect_uri=http://localhost/team34&scope=profile%20booking&state=state123" />
      </div>
    );
  }
}
