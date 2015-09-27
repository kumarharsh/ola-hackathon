import React from 'react';
import Base from '../../Base';

import ScheduleService from '../Schedule/service';
import { Paper, FlatButton } from 'material-ui';

export default class Notification extends Base {
  state = {
    visible: false,
    data: {}
  }

  componentDidMount() {
    // register schedule
    console.log('component mount')
    ScheduleService.start((data) => {
      console.log('called');
      this.setState({visible: true, data: data});
    });
  }

  _closeNotification = () => {
    this.setState({visible: false});
  };

  render() {
    const styles = {
      position: 'fixed',
      top: '0px',
      width: '100%',
      height: '200px',
      zIndex: '1000',
      display: this.state.visible ? null : 'none',
    };

    return (
      <Paper zDepth={4} style={styles}>
        <h3> Notification </h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque omnis officiis iste facilis nihil, quam nemo sequi eius, aut dolor at, odit eum amet saepe porro iure mollitia excepturi corrupti!</p>
        <FlatButton linkButton={true} href="/dashboard" onClick={this._closeNotification}>Book</FlatButton>
      </Paper>
    );
  }
}
