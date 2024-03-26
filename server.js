const mongoose = require('mongoose');
const express = require('express');
var morgan = require('morgan');
var { expressjwt: jwt } = require("express-jwt");
const app = express();
require('dotenv').config();

// .gitignore needs to include .env files and /node_modules

PORT = 3200;

app.use(express.json());
app.use(morgan("dev"));

mongoose.connect('mongodb://localhost:27017/BudgetManager');

app.use('/auth', require('./routes/authRouter.js'));
app.use('/api', jwt({ secret: process.env.SECRET, algorithms: ['HS256']}));
app.use('/user', require('./routes/userRouter.js'));

app.use((err, req, res, next) => {
    if(err.name === "Unauthorized Error"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
});

app.listen(PORT, () => {
    console.log(`Server successfully started on port: ${PORT}`);
});