import React from 'react';
import Base from '../../Base';

import { IconMenu, MenuItem, IconButton } from 'material-ui';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

export default class Menu extends Base {
  render() {
    const iconButtonElement = (<IconButton><MoreVertIcon /></IconButton>);
    return (
      <IconMenu iconButtonElement={iconButtonElement}></IconMenu>
    );
  }
}
