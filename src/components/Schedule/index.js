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
  FontIcon,
} from 'material-ui';

import {schedule} from './service'

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

    const scheduleList = schedule.getList();
    let scheduleListItems = null;
    if (scheduleList.length) {
      scheduleListItems = scheduleList.map((item) => {
        return <ListItem primaryText={item.name} />;
      });
    } else {
      scheduleListItems = (
        <ListItem primaryText={"Nothing scheduled yet"}
          secondaryText={<RaisedButton label={"Add"} onClick={this._add} />}
        />
      );
    }

    const fabStyles = {
      position: 'fixed',
      bottom: '50px',
      right: '50px',
    };

    const formStyles = {
      display: this.state.formOpen ? null : 'none',
      margin: '0 auto;',
      width: '80%;'
    };

    const fullWidth = {
      width: "100%"
    };

    return (
      <div>
        <div style={{display: !this.state.formOpen ? null : 'none'}}>
          <List> {scheduleListItems} </List>
          <FloatingActionButton onClick={this._openForm} style={fabStyles}>
            <FontIcon className="material-icons">plus</FontIcon>
          </FloatingActionButton>
        </div>
        <div style={formStyles}>
          <TextField
            style={fullWidth}
            floatingLabelText="Name"
            onChange={this._handleValueChange.bind(null, 'name')}
            value={this.state.form.name}
          />
          <TextField
            style={fullWidth}
            floatingLabelText="Pickup Point"
            onChange={this._handleValueChange.bind(null, 'pickup')}
            value={this.state.form.pickup}
          />
          <TextField
            style={fullWidth}
            floatingLabelText="End Point"
            onChange={this._handleValueChange.bind(null, 'end')}
            value={this.state.form.end}
          />
          <TimePicker
            style={fullWidth}
            onChange={this._handleTimeChange}
            format="ampm"
            hintText="12hr Format" />
          <SelectField
            style={fullWidth}
            onChange={this._handleValueChange.bind(null, 'category')}
            value={this.state.form.category}
            hintText="Hint Text"
            menuItems={categoryItems} />
          <SelectField
            style={fullWidth}
            onChange={this._handleValueChange.bind(null, 'repeat')}
            value={this.state.form.repeat}
            hintText="Hint Text"
            menuItems={timeItems} />
          <div>
            <RaisedButton label="Add"  onClick={this._add} secondary={true} />
            <FlatButton label="Cancel" onClick={this._closeForm} />
          </div>
        </div>
      </div>
    );
  }

  _add = () => {
    schedule.add(this.state.form);
    this._closeForm();
  };

  _closeForm = () => {
    this.setState({formOpen: false, form: {}});
  };

  _openForm = () => {
    this.setState({formOpen: true});
  };

  _handleTimeChange = (x, time) => {
    this.state.form.time = time.getTime();
    this.setState({form: this.state.form});
  };

  _handleValueChange = (name, e) => {
    this.state.form[name] = e.target.value;
    this.setState({form: this.state.form});
  };

  _addSchedule() {
    // @TODO
  }
}
