import React from 'react/addons';
import Base from './Base';

export default class App extends Base {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}
