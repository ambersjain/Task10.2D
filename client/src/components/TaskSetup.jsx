import React, { Fragment, useState } from 'react';
import axios from 'axios';

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

//Inpired by code from: https://www.youtube.com/watch?v=b6Oe2puTdMQ
function ImageUpload(props) {
    // To track actual file
    const [file, setFile] = useState('');
    // To set the file name when uploaded
    const [filename, setFilename] = useState('Choose File');
    //To show the image
    const [uploadedFile, setUploadedFile] = useState({});

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        console.log(formData)

        try {
            const res = await axios.post('http://localhost:8080/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });
            console.log("File Uploaded");
        } catch (err) {
            console.log(err);
        }
    };

    if (props.qType === "imageUpload") {
        return (
            <div className="form-group row">
                <label className="col-form-label col-sm-2">Upload an image to ask workers to tag things in the image</label>
                <Fragment>
                    <form onSubmit={onSubmit}>
                        <div className='custom-file mb-4'>
                            <input
                                type='file'
                                className='custom-file-input'
                                id='customFile'
                                onChange={onChange}
                            />
                            <label className='custom-file-label'
                                htmlFor='customFile'>
                                {filename}
                            </label>
                        </div>
                        Save as: <input className="form-control" name="image" defaultValue={uploadedFile.filePath || ''} onChange={props.onChange} />
                        <input
                            type='submit'
                            value='Upload'
                            className='btn btn-primary btn-block mt-4'
                        />

                    </form>
                    {uploadedFile ? (
                        <div className='row mt-5'>
                            <div className='col-md-6 m-auto'>
                                <h3 className='text-center'>{uploadedFile.fileName}</h3>
                                <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
                            </div>
                        </div>
                    ) : null}
                </Fragment>
            </div>
        )
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
                <Decision qType={props.option} onChange={props.onChange} />
                <Sentence qType={props.option} onChange={props.onChange} />
                <ImageUpload qType={props.option} onChange={props.onChange} />
            </div>
        </div>
    </div>)
}

export default TaskSetup;