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
        return (<div className="card cardContainer" onClick={() => setCardOpen(true)}>
            <div className="container">
                <h4><b>{props.title}</b></h4>
                <p>{props.description}</p>
                <p>{props.date}</p>
                <button className="deleteBtn" onClick={() => deleteTask(props._id)}> <i className="fa fa-trash"></i></button>
            </div>
        </div>)
    } else {
        return (<div className="cardOpened">
            <h2><u>Task Details</u></h2>
            <h4>{props.title}</h4>
            <p>{props.description}</p>
            <p>This task expires by {props.date}</p>
            <p>Workers Required :  {props.require_worker}</p>
            <p>Reward per response :  {props.reward_per_response}</p>
            <p>This task expires by {props.date}</p>
            <button className="btn btn-secondary btn-sm mb-3" onClick={() => setCardOpen(false)}>Close</button>
        </div>)
    }
}

const CardList = (props) => {
    const [dataVar, setDataVar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [year, setYear] = useState("");

    // loading the data into cards
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

    // Filter state for searching titles and year dropdown
    useEffect(() => {
        setFilteredTasks(
            dataVar.filter((data) =>
                (!data.date || data.date.substring(0, 4) === year) &&
                (!data.title || data.title.toLowerCase().includes(search.toLowerCase()))
            ))
    }, [search, year, dataVar]);


    const yearHandler = (e) => {
        console.log("Year selected is" + e.target.value);
        setYear(e.target.value)
    }

    const clearFilter = e => {
        setYear("");
        setSearch("");
    };

    if (year) {
        return (<div className="cardList">
            <Filter
                setSearch={setSearch}
                yearHandler={yearHandler}
                year={year}
                clearFilter={clearFilter}
            />
            {loading ?
                <div>.......loading</div> :
                <div>
                    {filteredTasks.map((job, index) => {
                        return <Card
                            key={job._id}
                            {...job}
                            dataVar={dataVar}
                            setDataVar={setDataVar} ></Card>;
                    })}
                </div>}

        </div>)

    } else {
        return (<div className="cardList">
            <Filter
                setSearch={setSearch}
                yearHandler={yearHandler}
                year={year}
                clearFilter={clearFilter}
            />
            {loading ?
                <div>.......loading</div> :
                <div>
                    {dataVar.map((job, index) => {
                        return <Card
                            key={job._id}
                            {...job}
                            dataVar={dataVar}
                            setDataVar={setDataVar} ></Card>;
                    })}
                </div>}

        </div>)

    }
}

const Filter = (props) => {
    return (
        <div className="container bg-light border mb-3">
            <div>
                <label className="mr-3 mt-3 md-3"> Year :  </label>
                <select defaultValue={props.year} onChange={props.yearHandler}>
                    <option value="Select year">Select year</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                </select>
            </div>

            <div className="mr-3 mt-3 mb-3">
                <label className="mr-3">Search: </label>
                <input
                    type="text"
                    placeholder="Search Titles"
                    onChange={(e) => props.setSearch(e.target.value)}
                />
            </div>

            <button className="btn btn-secondary btn-sm mb-3" onClick={props.clearFilter}>Clear Filters</button>
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