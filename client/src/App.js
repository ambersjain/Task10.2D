import React, { useState } from 'react';
import './css/App.css';
import NavbarBoot from './components/NavbarBoot';
import RequesterTask from './components/RequesterTask';
import WorkerTask from './components/WorkerTask';

const App = () => {

  const [activePage, setActivePage] = useState('New Requester Task');
  const handlePageChange = (event) => {
    let name = event.target.name;
    setActivePage(name);
  }

  return (
    <div className="container-fluid">
      <NavbarBoot onClick = {handlePageChange} activePage={activePage}/>
      <WorkerTask activePage={activePage}/>
      <RequesterTask activePage={activePage}/>
    </div>
  );
}


export default App;
