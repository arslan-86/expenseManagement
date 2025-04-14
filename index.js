const express = require('express');
const mongoose = require('mongoose');
const { router: expenseRouter} = require('./routes/expenses.routes.js');
// const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/expenses', expenseRouter);

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/expenseManagement');
        console.log('DB Connected Successfully')
        app.listen(8000, () => {
            console.log(`Server Running at ${80000}`)
        })
           
    } catch (error) {
        console.log(error);
    }
}


connectDB();



