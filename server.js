const mongoose = require('mongoose');
const express = require('express');
var morgan = require('morgan');
var { expressjwt: jwt } = require("express-jwt");
const app = express();
require('dotenv').config();


PORT = 3200;

app.use(express.json());
app.use(morgan("dev"));

mongoose.connect('mongodb://localhost:27017/BudgetManager');

app.use('/auth', require('./routes/authRouter.js'));
app.use('/api', jwt({ secret: process.env.SECRET, algorithms: ['HS256']}));
app.use('/api/user', require('./routes/userRouter.js'));
app.use('/api/expense', require('./routes/expenseRouter.js'));

app.use((err, req, res, next) => {
    if(err.name === "Unauthorized Error"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
});

app.listen(PORT, () => {
    console.log(`Server successfully started on port: ${PORT}`);
});