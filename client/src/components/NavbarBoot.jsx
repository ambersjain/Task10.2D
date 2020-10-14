import React from 'react';
import '../css/Navbar.css';

const NavbarBoot = (props) => {
  return (<div className="tab">
  <button name= 'New Requester Task' onClick={props.onClick} className={props.activePage}>New Requester Task</button>
  <button name='Worker Task' onClick={props.onClick} className={props.activePage}>Worker Task</button>
</div>)
}
export default NavbarBoot;