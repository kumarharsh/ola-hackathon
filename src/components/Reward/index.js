import React from 'react';
import { Link } from 'react-router';
import Base from '../../Base';

import { AppBar, RaisedButton, FlatButton, Dialog, TextField, CircularProgress } from 'material-ui';
import { OLA, primary, others } from '../../colors';
import fetch from 'isomorphic-fetch';
// import History from '../../Services/hist';

export default class Reward extends Base {

  constructor(props) {
    super()
    this.state = { value: 60, streak: 0 }
    this.shareTweet = () => {
      this.refs.tw_modal.show()
    }
    this.shareTweetSubmit = (e) => {
      // console.log(e)
      fetch('/tweet_on_twitter', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
      this.refs.tw_modal.dismiss()
    }
    this.closeTweet = () => {
      this.refs.tw_modal.dismiss()
    }
    this.shareFB = () => {
      this.refs.fb_modal.show()
    }
    this.closeFB = () => {
      this.refs.fb_modal.dismiss()
    }
    this.shareFBSubmit = (e) => {
      fetch('/share_on_facebook', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
      this.refs.fb_modal.dismiss()
    }
    this.schedule = () => {
      History.replaceState(null, '/schedule')
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
    let fbActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.closeFB} />,
      <FlatButton
        label="Share"
        primary={true}
        onTouchTap={this.shareFBSubmit} />
    ]
    let twActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.closeTweet} />,
      <FlatButton
        label="Tweet"
        primary={true}
        onTouchTap={this.shareTweetSubmit} />
    ]
    var fb_modal = (
      <Dialog
        ref="fb_modal"
        title="How was your ride?"
        actions={fbActions}
      >
      <TextField multiLine={true} />
      </Dialog>
    )
    var tw_modal = (
      <Dialog
        ref="tw_modal"
        title="How was your ride?"
        actions={twActions}
      >
      <TextField multiLine={true} />
      </Dialog>
    )
    return (
      <div style={{ height:'100%', backgroundColor:others.white, display:'flex', flexDirection:'column' }}>
        <h2 style={{padding:'0.1em 0', textAlign:'center'}}>
          Spread the Word,<br/>Increase your Rewards
        </h2>
        <div style={{flex:'1 0 auto'}}>
          <h3 style={{textAlign:'center'}}>Share your Experience, and get <span style={{color:primary}}>{this.state.streak * 100}</span> points.</h3>
          <div style={{display:'flex'}}>
            <FlatButton
              label="Twitter"
              style={{margin:'0 1rem', flex:'1 0 40%', color:others.white, backgroundColor:'#55ACEE'}}
              onClick={this.shareTweet}/>
            <FlatButton
              label="Facebook"
              style={{margin:'0 1rem', flex:'1 0 40%', color:others.white, backgroundColor:'#43609C'}}
              onClick={this.shareFB}/>
          </div>
          <FlatButton
            style={{width:'calc(100% - 2rem)', backgroundColor:others.black, color: OLA, margin:'1rem 1rem 0'}}
            label="Add this Route to Your Schedule"
            onClick={this.schedule}/>
        </div>
        <div style={{flex:'0 0 0px'}}>
          <Link
            style={{display:'block', height:'4rem', textAlign:'center', textDecoration:'none', lineHeight:'4rem', cursor:'pointer', width:'100%', padding:'1rem 0', borderRadius:0, backgroundColor:others.grey200, color:others.black}}
            to="/profile">OK</Link>
        </div>
        {fb_modal}
        {tw_modal}
      </div>
    );
  }
}
