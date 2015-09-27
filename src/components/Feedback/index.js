import React from 'react';
import Base from '../../Base';

import { RaisedButton, FlatButton, Dialog, TextField, CircularProgress, Card, CardText, Slider, List, ListItem } from 'material-ui';
import { primary, others } from '../../colors';
import fetch from 'isomorphic-fetch';
import History from '../../Services/hist';
import Carousel from 'nuka-carousel'


export default class Feedback extends Base {

  constructor() {
    super()
    this.state = { local: [] }
    this.gotoRewards = () => {
      History.replaceState(null, '/reward')
    }
  }

  componentWillMount() {
    fetch('/end_ride', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      this.setState({ local: data.events.local })
    })
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
    var events = this.state.local.map((event) => {
      return event.changes.map((change) => {
        return (
          <div>
            {change.metric.name} {change.value}
            <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1"/>
          </div>
        )
      })
    })
    return (
      <div>
        <div className="schedule-wrapper" style={{padding:'0.1em 0', textAlign:'center', backgroundColor: others.amber500, color:others.white}}>
          <RaisedButton
            label="OK"
            onClick={this.gotoRewards}
          />
        </div>
        <u>Rating</u>
        <div className="schedule-wrapper" style={{padding:'0.2em 0', margin: 10, textAlign:'center',  color:others.white}}>
          <Slider name="slider1" value={0.2} step={0.2}/>
        </div>
        <u>Rewards You Gained</u>
        <Carousel>
        {events}
        </Carousel>
      </div>
    );
  }
}
