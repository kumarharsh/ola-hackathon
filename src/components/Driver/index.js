import React from 'react';
import Base from '../../Base';

import { List, ListItem, TextField } from 'material-ui';
import fetch from 'isomorphic-fetch';

var client_located_url = '/ola/v1/sandbox/client_located?';
var start_trip_url = '/ola/v1/sandbox/start_trip?';
var end_trip_url = '/ola/v1/sandbox/end_trip?';
var get_imei_url = '/ola/v1/sandbox/get_imei?';
var ready_booking_url = '/ola/v1/sandbox/available_for_booking?imei=123456789123110';

export default class Driver extends Base {

  constructor() {
    super()
    this.state = { crn: 0 }
    this.ready = () => {
      fetch(ready_booking_url);
    };
    this.startTrip = () => {
      fetch(start_trip_url+'crn='+this.state.crn);
    };
    this.endTrip = () => {
      fetch(end_trip_url+'crn='+this.state.crn);
    };
    this.clientLocated = () => {
      fetch(client_located_url+'crn='+this.state.crn);
    };
    this.getImei = () => {
      fetch(get_imei_url+'crn='+this.state.crn);
    };
    this.onCRN = (event) => {
      this.setState({ crn: event.target.value })
    }
  }

  render() {
    return (
      <div>
        <TextField
          hintText="CRN"
          defaultValue="CRN"
          floatingLabelText="Enter the CRN"
          onChange={this.onCRN}
        />
        <List>
          <ListItem primaryText="Locate Client" onTouchTap={this.clientLocated} />
          <ListItem primaryText="Ready for Booking" onTouchTap={this.ready} />
          <ListItem primaryText="Start Trip" onTouchTap={this.start_trip} />
          <ListItem primaryText="End Trip" onTouchTap={this.endTrip}  />
          <ListItem primaryText="Get Imei" onTouchTap={this.getImei} />
        </List>
      </div>
    );
  }
}
