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
    selectValue: undefined
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
      { payload: '1', text: 'Never' },
      { payload: '2', text: 'Every Night' },
      { payload: '3', text: 'Weeknights' },
      { payload: '4', text: 'Weekends' },
      { payload: '5', text: 'Weekly' },
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
        <div>
          <List>
            { scheduleList.map((item) => <ListItem primaryText={item.text} />) }
          </List>

          <FloatingActionButton onClick={this._openDialog}></FloatingActionButton>

          <Dialog
            ref="dialog"
            title="Add New"
            actions={customActions}
            autoDetectWindowHeight={true} autoScrollBodyContent={true}>
            <TextField hintText="Hint Text" />
            <TextField hintText="Hint Text" />
            <TextField hintText="Hint Text" />
            <SelectField
              onChange={this._handleSelectValueChange}
              value={this.state.selectValue}
              hintText="Hint Text"
              menuItems={menuItems} />
          </Dialog>

        </div>
      </div>
    );
  }

  openDialog = () => {
    this.refs.dialog.show();
  };

  _addSchedule() {
    // @TODO
  }
}
