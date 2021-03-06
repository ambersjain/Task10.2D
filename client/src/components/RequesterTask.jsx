import React, { useState } from 'react';
import TaskType from './TaskType'
import TaskDescription from './TaskDescription';
import TaskSetup from './TaskSetup';
import WorkerRequirement from './WorkerRequirement';

const RequesterTask = (props) => {

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
        } else if (name === 'imageUpload') {
            setOption("imageUpload");
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
        worker_sentence: '',
        image: ''
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
        console.log("HERE IT IS:" + stateVar.image)
        fetch('http://localhost:8080/reqtask', {
            method: 'POST',
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
                image: stateVar.image
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => {
                console.log("Error:" + err)
            })
    }
    if (props.activePage === "New Requester Task") {
        return (
            <div>
                <TaskType
                    onChange={handleSetRadio}
                    onChange2={handleSetOption}
                    radio={radio}
                    value1="choice"
                    value2="decision"
                    value3="sentence"
                    value4="imageUpload"
                />
                <TaskDescription onChange={handleChange} />
                <TaskSetup option={option} onChange={handleChange} />
                <WorkerRequirement onChange={handleChange} />
                <button onClick={handleSubmit} className="btn btn-outline-success button-pos btn-md" type="submit" >Save</button>
            </div>
        )
    }
    return '';
}

export default RequesterTask;