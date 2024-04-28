const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.js');

userRouter.get('/', async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        res.status(500);
        return next(err);
    };
});

userRouter.get('/:userId', async (req, res, next) => {
    try {
        const singleUser = await User.find({ _id: req.params.userId });
        res.status(200).send(singleUser);
    } catch (err){
        res.status(500);
        return next(err);
    };
});


userRouter.put('/:userId', async (req, res, next) => {
    try {
        const updateUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            req.body,
            { new: true }
        );
        res.status(201).send(updateUser);
    } catch(err){
        res.status(500);
        return next(err);
    };
});

userRouter.post('/', async (req, res, next) => {
    try {
        const { username } = req.body;
        const existingUser = await User.findOne({ username });

        if (existingUser){
            return res.status(409).json({ error: "Username already exisits." });
        }

        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    } catch(err){
        res.status(500);
        return next(err);
    };
});

userRouter.delete('/:userId', async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete({ _id: req.params.userId });
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found." });
        }
        res.status(200).send(`Successfully deleted item: ${deletedUser.username}`);
    } catch(err){
        res.status(500);
        return next(err);
    };
});



module.exports = userRouter;