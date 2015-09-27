import React from 'react';
import { List, ListItem, Card, FontIcon } from 'material-ui';
import Base from '../../Base';
import { primary, accent, others } from '../../colors';
var rewards = require('../../Services/reward-store.json').rewards;

export default class Dashboard extends Base {
  render() {
    return (
      <div>
        <div style={{padding:'1rem 1rem'}}>You have <span style={{color:primary}}>750</span> points remaining.</div>
        <List>
          {rewards.map(function(reward) {
            return (
              <ListItem
                leftAvatar={
                  <div style={{width:'50px', height:'50px', borderRadius:'50%', overflow:'hidden'}}>
                    <img src={reward.image} style={{maxWidth:'100%', maxHeight:'100%'}}/>
                  </div>
                }
                rightIcon={
                  !reward.redeemed
                    ? <FontIcon className="material-icons">redeem</FontIcon>
                    : <FontIcon className="material-icons">done</FontIcon>
                }
                primaryText={<span>{reward.name} <span style={{float:'right',display:reward.redeemed ? 'none': 'block'}}><span style={{fontWeight:'bold', color:accent}}>{reward.cost}</span> Ola Points</span></span>}
                secondaryText={
                  <p>
                    {reward.redeemed ? <em style={{color:others.grey400}}>This reward has been redeemed.<br/></em> : ''}
                    {reward.description}
                  </p>
                }
                secondaryTextLines={2} />
            )
          })}
        </List>
      </div>
    );
  }
}
