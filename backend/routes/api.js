const router = require('express').Router();
const { taskValidation } = require('../validation');
const User = require('../models/User');
const Task = require('../models/Task');

// All tasks of user for fetching the data
router.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find({userId: req.user});
        res.json({"ok": tasks});
    }
    catch(err){
        res.status(400).json(err);
    }
})

// All tasks of user with intent for sharing the link
router.get('/tasks/:userid', async (req, res) => {
    try{
        const userTasks = await Task.find({userId: req.params.userid});
        res.json({"ok": userTasks});
    }
    catch(err){
        res.status(400).json(err);
    }
})

// One task
router.get('/tasks/:taskid', async (req, res) => {
    try{
        const task = await Task.find({_id: req.params.taskid});
        res.json({"ok": task});
    }
    catch(err){
        res.status(400).json(err);
    }
})

// Create a new task for logged user
router.post('/tasks', async (req, res) => {
    const { error } = taskValidation(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    const user = await User.findOne({_id: req.user});
    if(!user) return res.status(400).json('User does not exist');

    const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        userId: req.user
    });

    try{
        const savedTask = await newTask.save();
        res.json({"ok": savedTask});
    }
    catch(err){
        res.status(400).json(err);
    }
});

//Delete the task for the logged user
router.delete('/tasks/:taskid', async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({_id: req.body.taskid});
        res.json({"ok": task});
    }
    catch(err){
        res.status(400).json(err);
    }
})

// Update the task for the logged user
router.put('/tasks/:taskid', async (req, res) => {
    try{
        const task = await Task.findOneAndUpdate(
            {_id: req.params.taskid}, 
            {$set: 
                {
                    title: req.body.title, 
                    description: req.body.description,
                    done: req.body.done
                }
            }
        );
        res.json({"ok": task});
    }
    catch(err){
        res.status(400).json(err);
    }
})

module.exports = router;