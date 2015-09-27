import React from 'react';
import Base from '../../Base';

import {
  AppBar,
  List,
  ListItem,
  FloatingActionButton,
  RaisedButton,
  FlatButton,
  TextField,
  SelectField,
  TimePicker,
} from 'material-ui';

export default class Dashboard extends Base {

  state = {
    selectValue: undefined,
    formOpen: false,
    form: {},
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

    let categoryItems = [
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
        <div style={{display: !this.state.formOpen ? null : 'none'}}>
          <List>
            { scheduleList.map((item) => <ListItem primaryText={item.text} />) }
          </List>
          <FloatingActionButton onClick={this._openForm} />
        </div>
        <div style={{display: this.state.formOpen ? null : 'none'}}>
          <TextField
            hintText="Pickup Point"
            onChange={this._handleValueChange.bind(null, 'pickup')}
            value={this.state.form.pickup}
          />
          <TextField hintText="Hint Text" />
          <TextField hintText="Hint Text" />
          <TimePicker
            onChange={this._handleTimeChange}
            format="ampm"
            hintText="12hr Format" />
          <SelectField
            onChange={this._handleValueChange.bind(null, 'category')}
            value={this.state.form.category}
            hintText="Hint Text"
            menuItems={categoryItems} />
          <SelectField
            onChange={this._handleValueChange.bind(null, 'repeat')}
            value={this.state.form.repeat}
            hintText="Hint Text"
            menuItems={timeItems} />

          <RaisedButton label="Add"  onClick={this._add} />
          <FlatButton label="Cancel" onClick={this._cancelAdd} />

        </div>
      </div>
    );
  }

  _add = () => {
    console.log(this.state.form);
  }

  _cancelAdd = () => {
    this.setState({formOpen: false, form: {}});
  }

  _openForm = () => {
    this.setState({formOpen: true});
  };

  _handleTimeChange = (x, time) => {
    this.state.from['time'] = time
    this.set
  }

  _handleValueChange = (name, e) => {
    this.state.form[name] = e.target.value;
    this.setState({form: this.state.form});
  };

  _addSchedule() {
    // @TODO
  }
}
