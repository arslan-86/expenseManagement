const { Expense } = require('../models/expense.model.js')


const expensesGetController = async (req, res) => {
    try {
        const allExpenses = await Expense.find(req.query);
        // console.log(allExpenses)
        res.status(200).json({
            status: 'Success',
            data: allExpenses
        })
    } catch (error) {
        console.log(error);
    }
};

const expensesPostController = async ( req, res) => {
    try {
        const newExpense = await Expense.create({
            amount: req.body.amount,
            category: req.body.category,
            discription: req.body.discription,
            date: new Date(req.body.date)

        })

        res.status(201).json({
            status: 'Success',
            data: newExpense
        })
    } catch (error) {
        console.log(error)
    }
}

const expensesPutController = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(201).json({
            status: 'success',
            data: expense
        })

    } catch (error) {
        console.log(error)        
    }
}

const expensesDeleteController = async (req, res) => {
    try {
        await Expense.deleteOne({_id: req.params.id})
        res.status(204).json({
            status: "success"
        });
    } catch (error) {
        console.log(error);
    }
}

const expenseSummary = (req, res) => {
    res.send('expenseSummary')
}



module.exports = {
    expensesGetController,
    expensesPostController,
    expensesPutController,
    expensesDeleteController,
    expenseSummary
} 