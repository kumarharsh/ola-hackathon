import React from 'react';
import Base from '../../Base';
import Flame from '../Streak/Flame';

export default class Dashboard extends Base {

  constructor() {
    super()
    this.state = { scores: [], streak: 6 }
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
    var pt_metric = this.state.scores.find(function(s) { return s.metric.id === 'ola_points'; }),
        ola_points;
    if (pt_metric == null) {
      ola_points = 0;
    } else {
      ola_points = pt_metric.value;
    }
    return (
      <div>
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <div style={{borderRadius:'50%', height:'140px',width:'140px', overflow:'hidden'}}>
            <img src="/public/assets/user-avatar-256.jpg" alt="Kumar Harsh" style={{maxWidth:'100%', maxHeight:'100%'}}/>
          </div>
          <h4 className="user-name" style={{margin:'0.5em 0'}}>Kumar Harsh</h4>
          <h3 className="ola-points">{ola_points} Points</h3>
        </div>
        <div className="streak-wrapper" style={{padding:'0.1em 0', textAlign:'center'}}>
          <h3>My Streak</h3>
          <Flame streak={this.state.streak} width="100"/>
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
