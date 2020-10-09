const mongoose = require("mongoose");

const reqTaskSchema = mongoose.Schema({
    task_type: {
        type: String,
        maxlength: 50
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
        maxlength: 255,
    },
    worker_choice: {
        type: String,
    },
    worker_decision: {
        type: String,
    },
    worker_sentence: {
        type: String,
    },
    date: {
        type: Date,
    },
    require_worker: {
        type: String,
    },
    reward_per_response: {
        type: String,
    },
    number_of_workers: {
        type: String,
    },
});


//Defining the model
module.exports = mongoose.model('ReqTask', reqTaskSchema);
