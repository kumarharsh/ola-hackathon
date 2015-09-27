import 'react-tap-event-plugin'; // import for tap events
import React from 'react/addons';
import Base from './Base';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import AppTheme from './theme';
import RaisedButton from 'material-ui/lib/raised-button';
import { AppBar, IconMenu, MenuItem, IconButton, FlatButton } from 'material-ui';
import { Link } from 'react-router';
import { OLA, others } from './colors';
import Flame from './components/Streak/Flame';

export default class App extends Base {
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
    var pt_metric = user.scores.find(function(s) { return s.metric.id === 'ola_points'; }),
        ola_points;
    if (pt_metric == null) {
      ola_points = 0;
    } else {
      ola_points = pt_metric.value;
    }
    return (
      <div>
        <div style={{height:'100vh', display:'flex', flexDirection:'column'}}>
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
                <Flame streak={user.streak} width="50"/>
              </div>
            </Link>
          </div>
          <div className="MAP" style={{flex:'1 0 300px'}}></div>
          <div className="ride-status">
            <FlatButton label="Ride Now" style={{backgroundColor:others.black, color:OLA, width:'100%', borderRadius:0, padding:'1em 0'}}/>
          </div>
        </div>
      </div>
    );
  }
}