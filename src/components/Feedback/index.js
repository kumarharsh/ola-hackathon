import React from 'react';
import Base from '../../Base';

import { RaisedButton, FlatButton, Dialog, TextField, CircularProgress, Card, CardText, Slider, List, ListItem } from 'material-ui';
import { OLA, primary, accent, others } from '../../colors';
import fetch from 'isomorphic-fetch';
import History from '../../Services/hist';


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
    this.state.local.push(
      {
        "event": "level",
        "actor": {
          "id": "Mario",
          "alias": "SuperM"
        },
        "changes": [
          {
            "metric": {
              "id": "OLA_Points_Achievements",
              "name": "OLA Points Achievements",
              "type": "set"
            },
            "delta": {
              "Zuckerburg": {
                "old": null,
                "new": "1"
              }
            }
          }
        ],
        "timestamp": "2014-03-01T16:29:30.088Z",
        "id": ""
      }
    )
    var events = this.state.local.map((event) => {
      return event.changes.filter((change) => {
        return change.metric.id === 'ola_points' || change.metric.type === 'set';
      }).map((change) => {
        if (change.metric.type === 'point') {
          let del = change.delta.new - change .delta.old
          return (
            <ListItem primaryText={
              <span>
                <strong style={{backgroundColor:accent, color:others.white, display:'inline-block', borderRadius:'50%', margin:'0 10px', width:'32px', height:'32px', textAlign: 'center', lineHeight:'32px'}}>{del}</strong>
                {change.metric.name}
              </span>
            }/>
          )
        } else {
          return Object.keys(change.delta).map((badge) => {
            let value = change.delta[badge];
            let del = value.new - value.old;
            return (
              <ListItem
                primaryText={<span><span style={{color:accent}}>{badge}</span> badge from {change.metric.name}</span>}
                leftAvatar={<img src={"/public/assets/badges/" + badge + ".png"} width="50" height="50" alt={badge}/>}/>
            );
          })
        }
      })
    })
    return (
      <div style={{height:'100%', display:'flex', flexDirection:'column'}}>
        <div style={{padding:'0 1em'}}>
          <h4>How was your ride?</h4>
          <div className="schedule-wrapper" style={{padding:'0.2em 0', margin: '0 0 1em', textAlign:'center'}}>
            <Slider name="slider1" value={0.2} step={0.2}/>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <span>Sucked</span>
              <span>Rocked</span>
            </div>
          </div>
        </div>
        <div style={{flex:'1 0 auto', padding:'0 1em'}}>
          <h4>This ride gave you the following rewards:</h4>
          <List>
            {events}
          </List>
        </div>
        <div className="ride-status">
          <FlatButton label="OK" onClick={this.gotoRewards} style={{backgroundColor:others.black, color:OLA, width:'100%', borderRadius:0, padding:'1em 0'}}/>
        </div>
      </div>
    );
  }
}
