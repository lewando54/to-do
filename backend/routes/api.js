const router = require('express').Router();
const User = require('../models/User');

router.post('/tasks', async (req, res) => {
    const user = await User.findOne({_id: req.user});
    res.send("Logged as: " + user.username);
});

module.exports = router;