import React from 'react';
import Base from '../../Base';

import { AppBar, RaisedButton, FlatButton, Dialog, TextField, CircularProgress, Card, CardText, Slider, List, ListItem } from 'material-ui';
import { primary, others } from '../../colors';
import fetch from 'isomorphic-fetch';
import history from 'history'

export default class Feedback extends Base {

  constructor() {
    super()
    this.state = { value: 60, text: 'fsdfsd' }
  }

  render() {
    var cardStyle = {
      display: 'block',
      width: '100%',
      transitionDuration: '0.3s',
      height: '100'
    }
    var sliderStyle = {
      width: '95%',
      marginTop: '2.5%',
      marginLeft: '2.5%'
    }
    return (
      <div>
        <AppBar title="Ride Finished"/>
        <div className="schedule-wrapper" style={{padding:'0.1em 0', textAlign:'center', backgroundColor: others.amber500, color:others.white}}>
          <RaisedButton
            label="OK"
          />
        </div>
        <u>Rating</u>
        <Slider name="slider1" />
        <u>Rewards You Gained</u>
        <List>
          <ListItem primaryText="Inbox" />
          <ListItem primaryText="Starred" />
          <ListItem primaryText="Sent mail" />
          <ListItem primaryText="Drafts" />
          <ListItem primaryText="Inbox" />
        </List>
      </div>
    );
  }
}
