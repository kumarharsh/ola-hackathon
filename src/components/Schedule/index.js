import React from 'react';
import Base from '../../Base';

import {
  AppBar,
  List,
  ListItem,
  FloatingActionButton,
  FlatButton,
  Dialog,
  TextField,
  SelectField,
} from 'material-ui';

export default class Dashboard extends Base {

  state = {
    selectValue: undefined,
    formOpen: false
  };

  _handleSelectValueChange = (e) => {
    this.setState({selectValue: e.target.value});
  };

  render() {
    let customActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this._handleCustomDialogCancel} />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this._handleCustomDialogSubmit} />
    ];

    let menuItems = [
      { payload: '1', text: 'Social' },
      { payload: '2', text: 'Restaurants' },
      { payload: '3', text: 'Theaters' },
      { payload: '4', text: 'Hotels' },
      { payload: '5', text: 'Railways' },
      { payload: '6', text: 'Airports' },
      { payload: '7', text: 'Bus Stands' },
      { payload: '8', text: 'School' },
      { payload: '9', text: 'Hospital' },
    ];

    let timeItems = [
      { payload: '1', text: 'Once' },
      { payload: '2', text: 'Daily' },
      { payload: '3', text: 'Mon-Fri' },
      { payload: '4', text: 'Weekly' },
    ];

    const scheduleList = [
      {text: 'Item1'},
      {text: 'Item1'},
      {text: 'Item1'},
      {text: 'Item1'},
      {text: 'Item1'},
      {text: 'Item1'},
    ];

    return (
      <div>
        <AppBar title="Schedule"/>
        <div style={{display: !this.state.formOpen ? null : 'none'}}>
          <List>
            { scheduleList.map((item) => <ListItem primaryText={item.text} />) }
          </List>
          <FloatingActionButton onClick={this._openForm} />
        </div>
        <div style={{display: this.state.formOpen ? null : 'none'}}>
          <TextField hintText="" />
          <TextField hintText="Hint Text" />
          <TextField hintText="Hint Text" />
          <SelectField
            onChange={this._handleSelectValueChange}
            value={this.state.selectValue}
            hintText="Hint Text"
            menuItems={menuItems} />
          <SelectField
            onChange={this._handleSelectValueChange}
            value={this.state.selectValue}
            hintText="Hint Text"
            menuItems={timeItems} />
        </div>
      </div>
    );
  }

  _openForm = () => {
    this.setState({formOpen: true});
  };

  _addSchedule() {
    // @TODO
  }
}
