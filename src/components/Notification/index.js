import React from 'react';
import Base from '../../Base';

import ScheduleService, {schedule} from '../Schedule/service';
import { Paper, FlatButton, RaisedButton } from 'material-ui';
import History from '../../Services/hist';
import moment from 'moment';

export default class Notification extends Base {
  state = {
    visible: false,
    data: {
      schedule_item: {},
      cab: {}
    }
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
      zIndex: '1000',
      display: this.state.visible ? null : 'none',
      padding: '10px'
    };

    const {schedule_item, cab} = this.state.data;
    return (
      <Paper zDepth={4} style={styles}>
        <p>
          <b>Name</b>: {schedule_item.name} <br />
          <b>From</b>: {schedule_item.pickup} To: {schedule_item.end}<br />
          <b>Time</b>: {moment(schedule_item.time).format("h:mm a")} <br />
          <div style={{display:schedule_item.tp_name ? 'inline' : 'none'}}><b>Name</b>: {schedule_item.tp_name}</div>
          <div style={{display:schedule_item.ph ? 'inline' : 'none'}}><b>Phone No.</b>: {schedule_item.ph}</div>
        </p>
        <p><b>There is an ola cab availabe. Do you want to book it?</b></p>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <RaisedButton linkButton={true} onClick={this._closeNotification} secondary={true} label={"Book"} />
          <FlatButton linkButton={true} onClick={this._dismissNotification} label={"Dismis"} />
        </div>
      </Paper>
    );
  }
}
