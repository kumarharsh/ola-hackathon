import React from 'react/addons';
import Base from './Base';
import { AppBar, LeftNav, MenuItem } from 'material-ui';
import Notification from './components/Notification';
import _s from 'underscore.string';

export default class App extends Base {

  constructor() {
    super()
    this.showMenu = () => {
      this.refs.leftNav.toggle()
    }
  }

  // componentDidMount() {
    // this.refs.leftNav.toggle();
  // }

  render() {
    var menuItems = [
      { type: MenuItem.Types.LINK, text: 'Dashboard', payload: '/dashboard' },
      { type: MenuItem.Types.LINK, text: 'Profile', payload: '/profile' },
      { type: MenuItem.Types.LINK, text: 'Schedule', payload: '/schedule' },
      { type: MenuItem.Types.LINK, text: 'Reward Store', payload: '/reward-store' },
      { type: MenuItem.Types.LINK, text: 'Driver', payload: '/driver' },
      { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
      {
         type: MenuItem.Types.LINK,
         payload: 'https://playlyfe.com',
         text: 'Playlyfe',
      },
      {
         type: MenuItem.Types.LINK,
         payload: 'https://dev.playlyfe.com',
         text: 'Playlyfe Developer Docs'
      },
      { type: MenuItem.Types.SUBHEADER, text: '' },
      {
         type: MenuItem.Types.LINK,
         payload: '/logout',
         text: 'Logout'
      },
    ]
    var name = this.props.location.pathname.replace('/', '')
    name = _s.titleize(name);
    if (name === '') {
      name = 'Dashboard'
    }
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return (
      <div style={{height:'100vh',display:'flex',flexDirection:'column'}}>
        <Notification />
        <AppBar title={name} onLeftIconButtonTouchTap={this.showMenu} style={{flex:'0 0 auto'}}/>
        <LeftNav ref="leftNav" docked={false} menuItems={menuItems} />
        {this.props.children}
      </div>
    );
  }
}
