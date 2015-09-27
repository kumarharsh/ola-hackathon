import React from 'react';
import Base from '../../Base';

import ScheduleService, {schedule} from '../Schedule/service';
import { Paper, FlatButton } from 'material-ui';
import History from '../../Services/hist';

export default class Notification extends Base {
  state = {
    visible: false,
    data: {}
  }

  componentDidMount() {
    // register schedule
    ScheduleService.start((data) => {
      this.setState({visible: true, data: data});
      History.replaceState(null, '/ride_now');
    });
  }

  _dismissNotification = () => {
    const item_id = this.state.data.schedule_item.id;
    schedule.silentNotification(item_id);
    this.setState({visible: false});
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
        <div>
          <FlatButton linkButton={true} onClick={this._closeNotification}>Book</FlatButton>
          <FlatButton linkButton={true} onClick={this._dismissNotification}>Dismiss</FlatButton>
        </div>
      </Paper>
    );
  }
}
