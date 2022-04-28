const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {loginValidation, registerValidation} = require('../validation');

router.post('/register', async (req, res) => {

    // Data validation
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).json(error.details[0].message);
    
    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // User registration
    const user = new User({
        username: req.body.username, 
        password: hashedPassword });
    try{
        const savedUser = await user.save();
        res.json({"ok": savedUser});
    }
    catch(err){
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {

    // Data validation
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    // Checking if user exists
    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(400).json('Invalid username or password');

    // Checking password
    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
    if(!passwordIsValid) return res.status(400).json('Invalid username or password');

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('x-auth-token', token).json({"ok": token});
});

module.exports = router;