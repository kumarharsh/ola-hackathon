import React from 'react';
import Base from '../../Base';

import { List, ListItem } from 'material-ui';
import fetch from 'isomorphic-fetch';

var client_located_url = 'http://ts1­phoenix­proxy­api­1848854956.us­east­1.elb.amazonaws.com/v1/sandbox/client_located?crn=656';
var start_trip_url = '/ola/v1/sandbox/start_trip?crn=656';
var end_trip_url = '/ola/v1/sandbox/end_trip?crn=656';
var get_imei_url = '/ola/v1/sandbox/get_imei?crn=656';
var ready_booking_url = '/ola/v1/sandbox/available_for_booking?imei=123456789123110';

export default class Driver extends Base {

  constructor() {
    super()
    this.ready = () => {
      fetch(ready_booking_url);
    };
    this.startTrip = () => {
      fetch(start_trip_url);
    };
    this.endTrip = () => {
      fetch(end_trip_url);
    };
    this.clientLocated = () => {
      fetch(client_located_url);
    };
    this.getImei = () => {
      fetch(get_imei_url);
    };
  }

  render() {
    return (
      <div>
        <List>
          <ListItem primaryText="Locate Client" onTouchTap={this.clientLocated} />
          <ListItem primaryText="Ready for Booking" onTouchTap={this.ready} />
          <ListItem primaryText="Start Trip" onTouchTap={this.start_trip} />
          <ListItem primaryText="End Trip" onTouchTap={this.endTrip}  />
          <ListItem primaryText="Get IMEI" onTouchTap={this.getImei} />
        </List>
      </div>
    );
  }
}
