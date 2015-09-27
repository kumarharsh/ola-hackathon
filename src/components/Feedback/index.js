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
    this.state = { value: 60 }
    this.gotoRewards = () => {
      History.replaceState(null, '/reward')
    }
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
        <div className="schedule-wrapper" style={{padding:'0.1em 0', textAlign:'center', backgroundColor: others.amber500, color:others.white}}>
          <RaisedButton
            label="OK"
            onClick={this.gotoRewards}
          />
        </div>
        <u>Rating</u>
        <Slider name="slider1" />
        <u>Rewards You Gained</u>
        <Carousel>
        <img
          src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1"/>
        <img
          src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2"/>
        <img
          src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3"/>
        <img
          src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4"/>
        <img
          src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5"/>
        <img
          src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6"/>
      </Carousel>
      </div>
    );
  }
}
