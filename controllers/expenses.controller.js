const { Expense } = require('../models/expense.model.js')


const expensesGetController = async (req, res) => {
    try {

        // Filtering

        const condition = {}
        if (req.query.category) {
            condition.category = req.query.category
        }

        if (req.query.amountGreaterThan && req.query.amountLessThan) {
            condition.$and = [
                { amount: { $gte: req.query.amountGreaterThan } },
                { amount: { $gte: req.query.amountLessThan } }
            ]
        } else if (req.query.amountGreaterThan) {
            condition.amount = { $gte: req.query.amountGreaterThan }
        } else if (req.query.amountLessThan) {
            condition.amount = { $lte: req.query.amountLessThan }
        }

        let query = Expense.find(condition);

        //Sorting
        if (req.query.sort) {
            let sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('amount')
        }

        // Limiting the fields
        if (req.query.fiels) {
            let fields = req.query.fields.split(',').join(' ');
            query = query.select(fields)
        }

        // Pagination
        let page = req.query.page * 1 || 1;
        let limit = req.query.limit * 1 || 10;
        let skip = (page - 1) * limit;

        let numberRecords = await Expense.countDocuments();

        if (skip < numberRecords) {
            query = query.skip(skip).limit(limit);
        } else {
            return res.status(404).json({
                status: 'failed',
                message: 'Page does not exist'
            })
        }

        const allExpenses = await query;
        // console.log(allExpenses)
        res.status(200).json({
            status: 'Success',
            length: allExpenses.length,
            data: allExpenses
        })
    } catch (error) {
        console.log(error);
    }
};

const expensesPostController = async (req, res) => {
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
        await Expense.deleteOne({ _id: req.params.id })
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