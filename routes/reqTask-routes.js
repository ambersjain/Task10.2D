const router = require('express').Router();

// Requester Task Model
const ReqTask = require("../models/reqTask");


router.get('/reqtask', (req, res) => {

    const reqTask = {
        task_type: req.body.task_type,
        title: req.body.title,
        description: req.body.description,
        worker_choice: req.body.worker_choice,
        worker_decision: req.body.worker_decision,
        worker_sentence: req.body.worker_sentence,
        date: req.body.expiry_date,
        require_worker: req.body.require_worker,
        reward_per_response: req.body.reward_per_response,
        number_of_workers: req.body.number_of_workers,
    }
    res.send(reqTask)
})

router.post('/reqtask', (req, res) => {
    const reqTask = new ReqTask(
        {
            task_type: req.body.task_type,
            title: req.body.title,
            description: req.body.description,
            worker_choice: req.body.worker_choice,
            worker_decision: req.body.worker_decision,
            worker_sentence: req.body.worker_sentence,
            date: req.body.date,
            require_worker: req.body.require_worker,
            reward_per_response: req.body.reward_per_response,
            number_of_workers: req.body.number_of_workers,
        }
    );

    reqTask.save()
        .then((reqTask) => {
            res.json(('saved to db: ' + reqTask))
            console.log("Req task added!! " + reqTask.title)
        })
        .catch((err) => {
            console.log(err);
        });
})


module.exports = router;
