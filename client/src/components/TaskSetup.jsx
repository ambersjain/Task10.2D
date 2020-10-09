import React from 'react';


function Decision(props) {
    if (props.qType === "decision") {
        return <div className="form-group row">
            <label className="col-form-label col-sm-2"> Example, You can ask "Do you understand Data Structures?" Yes/No</label>
            <div className="col-sm-5">
                <input type="text" name="worker_decision" className="form-control" placeholder="Type your question.." onChange={props.onChange} />
            </div>
        </div>;
    }
    return '';
}

function Sentence(props) {
    if (props.qType === "sentence") {
        return <div className="form-group row">
            <label className="col-sm-2 col-form-label">Example, You can ask "Tell one difference between the Map and Object?"</label>
            <div className="col-sm-5">
                <input type="text" name="worker_sentence" className="form-control" placeholder="Start typing.." onChange={props.onChange} />
            </div>
        </div>;
    }
    return '';
}

function Choice(props) {
    if (props.qType === "choice") {
        return <div className="form-group row">
            <label className="col-form-label col-sm-2">Example, You can ask "As a worker, what are you an expert in?"</label>
            <div className="col-sm-5">
                <input type="text" name="worker_choice" className="form-control" placeholder="Start typing.." onChange={props.onChange} />
            </div>
        </div>
    }
    return '';
}

const TaskSetup = (props) => {

    return (<div className="container-fluid">
        <div className="shadow-none pt-2 pb-2 mt-4 mb-2 bg-light"><h3>Setting up your Task</h3></div>
        <div className="form">
            <h1>{props.radio}</h1>
            <div className="form">
                <Choice qType={props.option} onChange={props.onChange} />
                <Decision qType={props.option} onChange={props.onChange}  />
                <Sentence qType={props.option} onChange={props.onChange} />
            </div>
        </div>
    </div>)
}

export default TaskSetup;