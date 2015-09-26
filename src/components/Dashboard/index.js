import React from 'react';
import Base from '../../Base';

import { AppBar } from 'material-ui';
import { primary, others } from '../../colors';

import Flame from '../streak/Flame';

export default class Dashboard extends Base {
  render() {
    this.props.streak = 6;
    return (
      <div>
        <AppBar title="Dashboard"/>
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <div style={{borderRadius:'50%', height:'140px',width:'140px', overflow:'hidden'}}>
            <img src="/public/assets/user-avatar-256.jpg" alt="Kumar Harsh" style={{maxWidth:'100%', maxHeight:'100%'}}/>
          </div>
          <h4 className="user-name" style={{margin:'0.5em 0'}}>Kumar Harsh</h4>
          <h3 className="ola-points">750 Points</h3>
        </div>
        <div className="streak-wrapper" style={{padding:'0.1em 0', textAlign:'center'}}>
          <h3>My Streak: <span>{this.props.streak}</span></h3>
          <Flame streak={this.props.streak} width="100"/>
        </div>
        <div className="trophy-room" style={{padding:'0.1em 0', textAlign:'center'}}>
          <h3>My Achievements</h3>
        </div>
        <div className="schedule-wrapper" style={{padding:'0.1em 0', textAlign:'center'}}>
          <h3>My Schedule</h3>
        </div>
      </div>
    );
  }
}
