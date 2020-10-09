import React, { useState } from 'react';
import './css/App.css';
import NavbarBoot from './components/NavbarBoot';
import TaskType from './components/TaskType';
import TaskDescription from './components/TaskDescription';
import TaskSetup from './components/TaskSetup';
import WorkerRequirement from './components/WorkerRequirement';

/*
  This set's up the style and HTML for navbar
*/
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const App = () => {
  const [radio, setRadio] = useState('');
  const [option, setOption] = useState('');

  const handleSetRadio = (event) => {
    const value = event.target.value;
    setRadio(value);
  }
  //This function writes the main radios to the sibling (<TaskType> --> <TaskSetup>)
  const handleSetOption = (event) => {
    const name = event.target.name;
    if (name === 'choice') {
      setOption("choice");
    } else if (name === 'decision') {
      setOption("decision");
    } else if (name === 'sentence') {
      setOption("sentence");
    }

  }
  const [stateVar, setStateVar] = useState({
    title: '',
    description: '',
    expiry_date: '',
    master_worker: '',
    reward_per_response: '',
    number_of_workers: '',
    worker_choice: '',
    worker_decision: '',
    worker_sentence: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setStateVar((preValue) => {
      return {
        ...preValue,
        [name]: value
      }
    })
  }

  const handleSubmit = () => {
    fetch('http://localhost:8080/reqtask', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task_type: radio,
        title: stateVar.title,
        description: stateVar.description,
        worker_choice: stateVar.worker_choice,
        worker_decision: stateVar.worker_decision,
        worker_sentence: stateVar.worker_sentence,
        date: stateVar.expiry_date,
        require_worker: stateVar.master_worker,
        reward_per_response: stateVar.reward_per_response,
        number_of_workers: stateVar.number_of_workers,
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => {
        console.log("Error:" + err)
      })
  }
  return (
    <div className="container-fluid">
      <NavbarBoot />
      <TaskType
        onChange={handleSetRadio}
        onChange2={handleSetOption}
        radio={radio}
        value1="choice"
        value2="decision"
        value3="sentence"
      />
      <TaskDescription
        onChange={handleChange} />
      <TaskSetup option={option} onChange={handleChange} />
      <WorkerRequirement onChange={handleChange} />
      <button onClick={handleSubmit} className="btn btn-outline-success button-pos btn-md" type="submit" >Save</button>
    </div>
  );
}


export default App;
