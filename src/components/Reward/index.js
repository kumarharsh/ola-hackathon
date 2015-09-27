import React from 'react';
import Base from '../../Base';

import { AppBar, RaisedButton, FlatButton, Dialog, TextField, CircularProgress } from 'material-ui';
import { primary, others } from '../../colors';
import fetch from 'isomorphic-fetch';
import history from 'history'

export default class Reward extends Base {

  constructor(props) {
    super()
    console.log(props)
    console.log(props.routes[0].component)
    this.state = { value: 60 }
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
    }
  }

  render() {
    //Custom Actions
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
        title="How was your ride ?"
        actions={fbActions}
      >
      <TextField multiLine={true} />
      </Dialog>
    )
    var tw_modal = (
      <Dialog
        ref="tw_modal"
        title="How was your ride ?"
        actions={twActions}
      >
      <TextField multiLine={true} />
      </Dialog>
    )
    return (
      <div>
        <div className="schedule-wrapper" style={{padding:'0.1em 0', textAlign:'center', backgroundColor: others.amber500, color:others.white}}>
          <CircularProgress mode="determinate" value={this.state.value} size={5} />
          <RaisedButton
            label="Share this on Twitter"
            onClick={this.shareTweet}
          />
        </div>
        <div className="schedule-wrapper" style={{padding:'0.1em 0', textAlign:'center', backgroundColor: others.amber500, color:others.white}}>
          <RaisedButton
            label="Share this on Facebook"
            onClick={this.shareFB}
          />
        </div>
        <div className="schedule-wrapper" style={{padding:'0.1em 0', textAlign:'center', backgroundColor: others.amber500, color:others.white}}>
          <RaisedButton
            label="Schedule this Ride"
            onClick={this.schedule}
          />
        </div>
        {fb_modal}
        {tw_modal}
      </div>
    );
  }
}
