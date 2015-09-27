import React from 'react';
import Base from '../../Base';
import Flame from '../Streak/Flame';
import { Dialog } from 'material-ui';
import { others } from '../../colors';

export default class Dashboard extends Base {

  constructor() {
    super()
    this.state = { scores: [], streak: 6, achievement: {}}
  }

  componentWillMount() {
    console.log('mounting')
    fetch('/api/runtime/player?player_id=1&detailed=true')
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

  _openModal = (value, e) => {
    this.setState({achievement: value});
    this.refs.achievementDialog.show();
  };

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
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', color:others.white, backgroundColor:others.grey800}}>
          <div style={{borderRadius:'50%', height:'140px',width:'140px', marginTop:'1rem', overflow:'hidden'}}>
            <img src="/public/assets/user-avatar-256.jpg" alt="Kumar Harsh" style={{maxWidth:'100%', maxHeight:'100%'}}/>
          </div>
          <h4 className="user-name" style={{margin:'0.5em 0', fontSize:'2rem'}}>Kumar Harsh</h4>
        </div>

        <div style={{display:'flex', color: others.white, backgroundColor:others.grey800}}>
          <div className="user-points" style={{textAlign:'center', padding:'1em 1em 0.5em', flex:'0 0 50%', borderLeft:'1px solid ' + others.grey700}}>
            <div style={{fontSize:'4rem',fontWeight:'bold'}}>{ola_points}</div>
            <div style={{fontSize:'1rem'}}>OLA Points</div>
          </div>
          <div className="streak" style={{flex:'0 0 50%', padding:'1em 0'}}>
            <Flame streak={this.state.streak} mega={true} width="50"/>
          </div>
        </div>

        <div className="trophy-room" style={{padding:'0.1em 0', textAlign:'center'}}>
          {this.state.scores.map((score) => {
            if (score.metric.type !== 'set') {
              return;
            }
            return (
              <ul style={{listStyle:'none', margin:'0 0 2rem', padding:'0'}}>
                <header style={{marginTop:'0', padding:'1rem 0', backgroundColor:others.grey100, fontSize:'1.5em'}}>{score.metric.name}</header>
                {score.value.map((value) => {
                  return (
                    <li style={{display:'inline-block', verticalAlign:'top', padding:'0.5em', width:'110px', padding:'1rem 2rem'}} onClick={this._openModal.bind(this, value)}>
                      <div style={{height:'110px',width:'110px', overflow:'hidden', opacity: !!value.count ? '1' : '0.3'}}>
                        <img src={"/public/assets/badges/" + value.name + ".png"} alt={value.name} style={{maxWidth:'100%', maxHeight:'100%'}}/>
                      </div>
                      <div style={{fontSize:'0.8em'}}>{value.name}</div>
                    </li>
                  )
                })}
              </ul>
            );
          })}
        </div>
        <Dialog
          ref="achievementDialog"
          title={this.state.achievement.name}
          actions={[{text: 'OK'}]}
          modal={this.state.modal}
          contentStyle={{textAlign:'center'}}>
          <div style={{margin:'0 auto', height:'140px',width:'140px', overflow:'hidden', opacity: !!this.state.achievement.count ? '1' : '0.3' }}>
            <img src={"/public/assets/badges/" + this.state.achievement.name + ".png"} alt={this.state.achievement.name} style={{maxWidth:'100%', maxHeight:'100%'}}/>
          </div>
          <div style={{textAlign:'center'}}>{this.state.achievement.description}</div>
        </Dialog>
      </div>
    );
  }
}
