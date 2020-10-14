import React, { useState, useEffect } from 'react';
import '../css/Card.css';

const Card = (props) => {

    console.log(props._id);
    const deleteTask = (_id) => {
        fetch('http://localhost:8080/reqtask/' + _id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .catch(err => {
                console.log("Error:" + err)
            })
    }

    return (<div className="card">
        <div className="container">
            <h4><b>{props.title}</b></h4>
            <p>{props.description}</p>
            <p>{props.date}</p>
            <button onClick={deleteTask(props._id)}>Delete</button>
        </div>
    </div>)
}

const CardList = (props) => {
    const [dataVar, setDataVar] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8080/reqtask');
            const dta = await response.json();
            const [item] = dta;
            console.log(dta);
            setDataVar(dta);
            setLoading(false);
        }
        fetchData();
    }, []);

    return (<div className="cardList">
        {/* This syntax means if dataVar exists then only it will be rendered. */}
        {loading ? <div>.......loading</div> :
            <div>
                {dataVar.map((job, index) => {
                    return <Card key={job._id} {...job} dataVar = {dataVar}></Card>;
                })}
            </div>}

    </div>)
}

const WorkerTask = (props) => {
    if (props.activePage === "Worker Task") {
        return (
            <div>
                <CardList />
            </div>
        )
    }
    return '';
}

export default WorkerTask;