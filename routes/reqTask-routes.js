const router = require('express').Router();
const fileUpload = require('express-fileupload');
const path = require('path');
// Requester Task Model
const ReqTask = require("../models/reqTask");


router.use(fileUpload());


router.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'Upload failed' })
    }
    const file = req.files.file;

    file.mv(path.join(__dirname, `/../client/public/uploads/${file.name}`), err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
    });
})


router.get('/reqtask', (req, res) => {
    ReqTask.find()
        .then((entries) => {
            res.json(entries);
        })
        .catch(() => res.send("Not found anything"));
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
            image: req.body.image
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

router.delete('/reqtask/:_id', (req, res) => {
    ReqTask.deleteOne({ _id: req.params._id }, (err, foundWorker) => {
        if (foundWorker) { console.log("This one deleted!"); res.send(foundWorker) }
        else { res.send("Worker account not deleted") }
    })
})

module.exports = router;
