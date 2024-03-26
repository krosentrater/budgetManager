const express = require('express');
const authRouter = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

//Signup
authRouter.post('/signup', async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username.toLowerCase() });
        if(existingUser){
            res.status(403);
            return next(new error('Username Already Exists'));
        }
        const newUser = new User(req.body);
        const savedUser = await newUser.save();

        const token = jwt.sign(savedUser.toObject(), process.env.SECRET);
        return res.status(201).send({ token, user: savedUser });
    } catch(err){
        res.status(500);
        return next(err);
    }
});

module.exports = authRouter;