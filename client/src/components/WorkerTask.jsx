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
    const [search, setSearch] = useState("");
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [year, setYear] = useState("2020");

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
                !data.date || data.date.substring(0, 4) === year &&
                data.title.toLowerCase().includes(search.toLowerCase())
            ))
    }, [year, search, dataVar]);


    const yearHandler = (e) => {
        console.log("Year selected is" + e.target.value);
        setYear(e.target.value)
    }

    const clearFilter = e => {
        setYear("2020");
        setSearch("");
    };

    return (<div className="cardList">
        <Filter
            setSearch={setSearch}
            yearHandler={yearHandler}
            year={year}
            clearFilter={clearFilter}
        />
        {/* This syntax means if dataVar exists then only it will be rendered. */}
        {loading ? <div>.......loading</div> :
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
}

const Filter = (props) => {
    return (
        <div className="container bg-light border mb-3">
            <input
                type="text"
                placeholder="Search Titles"
                onChange={(e) => props.setSearch(e.target.value)}
            />
            <div>
                <label> Year :  </label>
                <select defaultValue={props.year} onChange={props.yearHandler}>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                </select>
            </div>

            <button onClick={props.clearFilter}>Clear Filters</button>
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