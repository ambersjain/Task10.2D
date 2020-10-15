import React, { useState, useEffect } from 'react';
import '../css/Card.css';

const Card = (props) => {

    const deleteTask = (_id) => {
        //delete from FE
        const newList = props.dataVar.filter((item) => item._id !== _id);
        props.setDataVar(newList);
        //delete from BE (db)
        fetch('http://localhost:8080/reqtask/' + _id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .catch(err => {
                console.log("Error:" + err)
            })
    }

    const [cardOpen, setCardOpen] = useState(false);


    if (!cardOpen) {
        return (<div className="card" onClick={() => setCardOpen(true)}>
            <div className="container">
                <h4><b>{props.title}</b></h4>
                <p>{props.description}</p>
                <p>{props.date}</p>
                <button onClick={() => deleteTask(props._id)}>Delete</button>
            </div>
        </div>)
    } else {
        return (<div>
            <h1>This is the card details</h1>
            <h3>{props.title}</h3>
            <h3>{props.description}</h3>
            <h3>{props.date}</h3>
            <button onClick={() => setCardOpen(false)}>Close</button>
            </div>)
    }
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
                    return <Card key={job._id}
                    {...job}
                    dataVar={dataVar}
                    setDataVar={setDataVar} ></Card>;
                })}
            </div>}

    </div>)
}

const WorkerTask = (props) => {
    if (props.activePage === "Worker Task") {
        return (
            <div className="container">
                <h2>Welcome, these are the tasks available for you.</h2>
                <CardList />
            </div>
        )
    }
    return '';
}

export default WorkerTask;