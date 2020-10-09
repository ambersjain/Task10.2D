import React, {Component} from 'react';
//import '../css/Navbar.css';
import { Menu } from 'semantic-ui-react';

export default class MenuExampleTabular extends Component {
  state = { activeItem: 'New Requester Task' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Menu>
        <Menu.Item
          name='New Requester Task'
          active={activeItem === 'New Requester Task'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Worker Task'
          active={activeItem === 'Worker Task'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}
