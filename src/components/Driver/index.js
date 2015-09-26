import React from 'react';
import Base from '../../Base';

import { AppBar, RaisedButton, List, ListItem } from 'material-ui';
import { primary, others } from '../../colors';
import fetch from 'isomorphic-fetch';
import history from 'history'

var client_located_url = 'http://ts1­phoenix­proxy­api­1848854956.us­east­1.elb.amazonaws.com/v1/sandbox/client_located?crn=656'
var start_trip_url = 'http://sandbox-t.olacabs.com/v1/sandbox/start_trip?crn=656'
var end_trip_url = 'http://sandbox-t.olacabs.com/v1/sandbox/end_trip?crn=656'
var get_imei_url = 'http://sandbox-t.olacabs.com/v1/sandbox/get_imei?crn=656'
var ready_booking_url = 'http://sandbox-t.olacabs.com/v1/sandbox/available_for_booking?imei=123456789123110'

export default class Driver extends Base {

  constructor() {
    super()
    this.ready = () => {
      fetch(ready_booking_url, { headers: {'X-APP-Token': '883fec6fca1b413c9032b19f48a04958'} })
    }
    this.startTrip = () => {
      fetch(start_trip_url)
    }
    this.endTrip = () => {
      fetch(end_trip_url)
    }
    this.clientLocated = () => {
      fetch(client_located_url)
    }
    this.getImei = () => {
      fetch(get_imei_url)
    }
  }

  render() {
    return (
      <div>
        <AppBar title="Driver"/>
        <List>
          <ListItem primaryText="Locate Client" onClick={this.clientLocated} />
          <ListItem primaryText="Ready for Booking"  />
          <ListItem primaryText="Start Trip"  />
          <ListItem primaryText="End Trip"  />
          <ListItem primaryText="Get Imei"  />
        </List>
      </div>
    );
  }
}
