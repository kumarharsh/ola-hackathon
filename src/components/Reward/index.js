import React from 'react';
import Base from '../../Base';

import { AppBar, RaisedButton } from 'material-ui';
import { primary, others } from '../../colors';
import fetch from 'isomorphic-fetch';
import history from 'history'

export default class Reward extends Base {

  constructor() {
    super()
    // data.trip_info.distance.value
    var data = {
      name: 'Hubot',
      login: 'hubot',
    }
    this.endRide = () => {
      fetch('/end_ride', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(() => {
         history.replaceState(null, '/') // TODO change route
      })
    }
    this.shareTweet = () => {
      fetch('/tweet_on_twitter', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
      .then(() => {
        alert('Tweet on Twitter')
      })
    }
    this.shareFB = () => {
      fetch('/share_on_facebook', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
      .then(() => {
        alert('Shared on FB')
      })
    }
    this.schedule = () => {
      alert('schedule')
    }
  }

  render() {
    return (
      <div>
        <AppBar title="Reward"/>
        <RaisedButton
          label="End Ride"
          onClick={this.endRide}
        />
        <div className="schedule-wrapper" style={{padding:'0.1em 0', textAlign:'center', backgroundColor: others.amber500, color:others.white}}>
          <RaisedButton
            label="Share this on Twitter"
            onClick={this.shareTweet}
          />
        </div>
        <div className="schedule-wrapper" style={{padding:'0.1em 0', textAlign:'center', backgroundColor: others.amber500, color:others.white}}>
          <RaisedButton
            label="Share this on Facebook"
            onClick={this.shareFB}
          />
        </div>
        <div className="schedule-wrapper" style={{padding:'0.1em 0', textAlign:'center', backgroundColor: others.amber500, color:others.white}}>
          <RaisedButton
            label="Schedule this Ride"
            onClick={this.schedule}
          />
        </div>
      </div>
    );
  }
}
