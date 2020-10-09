import React from 'react';


const WorkerRequirement = (props) => {
    return (<div className="container-fluid">
        <div className="shadow-none pt-2 pb-2 mt-4 mb-2 bg-light"><h3>Worker Requirement</h3></div>
        <div className="form">
            <div className="form-group row">
                <label className="col-form-label col-sm-2">Require Master Workers</label>
                <div className="form-check form-check-inline ml-3">
                    <input className="form-check-input" type="radio" name="master_worker" id="inlineRadio1" value="Yes" onChange={props.onChange}/>
                    <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline ml-3">
                    <input className="form-check-input" type="radio" name="master_worker" id="inlineRadio2" value="No" onChange={props.onChange}/>
                    <label className="form-check-label">No</label>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Reward per response</label>
                <div className="col-sm-5">
                    <input type="text" className="form-control" id="inputEmail3" placeholder="$" name="reward_per_response" onChange={props.onChange}  />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Number of workers</label>
                <div className="col-sm-5">
                    <input type="text" className="form-control" id="inputPassword3" placeholder="#" name="number_of_workers" onChange={props.onChange}/>
                </div>
            </div>

        </div>
    </div>)
}

export default WorkerRequirement;