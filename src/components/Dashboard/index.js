import Base from '../../Base';
import React from 'react';

import { FlatButton } from 'material-ui';
import { Link } from 'react-router';
import { OLA, others } from '../../colors';
import Flame from '../Streak/Flame';
import RideMap from './RidesMap';

import fetch from 'isomorphic-fetch';
import OlaApi from '../../Services/OlaApi'

export default class Dashboard extends Base {

  constructor() {
    super()
    this.state = { scores: [], streak: 0, rideAvailable: false, dir: {H: 0, L: 0 } }
    this.changePt = (e) => {
      this.setState({ dir: { H: e.H, L: e.L }})
      OlaApi.client.api(`/v1/products?pickup_lat=${e.H}&pickup_lng=${e.L}`, 'GET')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
    }
  }

  componentWillMount() {
    console.log('mounting')
    fetch('/api/runtime/player?player_id=1')
    .then((response) => {
      return response.json()
    })
    .then((player) => {
      this.setState({ scores: player.scores })
    })
    fetch('/streak')
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      this.setState({ streak: json.streak })
    })
  }

  render() {
    var user = {
      name: 'Kumar Harsh',
      streak: 3,
      scores: [
        {
          metric: {
            id: 'ola_points',
            type: 'points',
            name: 'OLA Points'
          },
          value: 750
        }
      ],
      avatar: {
        medium: {
          url: '/public/assets/user-avatar-72.jpg',
          width: 72,
          height: 72
        },
        large: {
          url: '/public/assets/user-avatar-256.jpg',
          width: 256,
          height: 256
        }
      }
    }
    var pt_metric = this.state.scores.find(function(s) { return s.metric.id === 'ola_points'; }),
        ola_points;
    if (pt_metric == null) {
      ola_points = 0;
    } else {
      ola_points = pt_metric.value;
    }
    return (
      <div style={{height:'100%'}}>
        <div style={{height:'100%', display:'flex', flexDirection:'column'}}>
          <div className="user-profile" style={{backgroundColor: others.grey800, borderBottom:'2px solid ' + OLA, padding:'0 1em'}}>
            <Link to={'/dashboard'} style={{display:'flex', height:'100%', color: others.white, textDecoration:'none'}}>
              <div className="avatar" style={{borderRadius:'50%', width: user.avatar.medium.width, height: user.avatar.medium.height, overflow:'hidden', flexGrow:0, margin:'1em 0'}}>
                <img src={user.avatar.medium.url} alt={user.name} style={{maxWidth:'100%', maxWidth:"100%"}}/>
              </div>
              <div className="user-details" style={{flex:'1 0 auto', padding:'1em 0.5em 1em', borderRight:'1px solid ' + others.grey900}}>
                <h3 className="user-name" style={{margin: 0}}>{user.name}</h3>
              </div>
              <div className="user-points" style={{textAlign:'center', padding:'1em 1em 0.5em', flex:'1 0 auto', borderLeft:'1px solid ' + others.grey700}}>
                <div style={{fontSize:'3rem',fontWeight:'bold'}}>{ola_points}</div>
                <div style={{fontSize:'1rem'}}>OLA Points</div>
              </div>
              <div className="streak" style={{flexGrow:0, padding:'1em 0'}}>
                <Flame streak={this.state.streak} width="50"/>
              </div>
            </Link>
          </div>
          <div className="MAP" style={{flex:'1 0 auto'}}>
            <RideMap onChangeLocation={this.changePt} />
          </div>
          <div className="ride-status">
            <FlatButton label="Ride Now" disable={this.state.rideAvailable} style={{backgroundColor:others.black, color:OLA, width:'100%', borderRadius:0, padding:'1em 0'}}/>
          </div>
        </div>
      </div>
    );
  }
}
