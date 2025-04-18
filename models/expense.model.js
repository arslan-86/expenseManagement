const mongoose = require('mongoose');



const Schema = mongoose.Schema;


const expenseSchema  = new Schema ({
    amount: {
        type: Number,
        required: true,
        min: [1, 'Amount should be positive']
    },
    category:{
        type: String
    },
    discription:{
        type: String
    },
    date:{
        type: Date,
        validate: {
            validator: function (value){
                return !isNaN(Date.parse(value))
            }
        },
        message: 'Invalid date format'
    }
});



const Expense = mongoose.model('Expense', expenseSchema);


module.exports = {
    Expense
}