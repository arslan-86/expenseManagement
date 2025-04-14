const express = require('express');
const { expensesDeleteController,
        expensesGetController,
        expensesPostController,
        expensesPutController,
        expenseSummary
} = require('../controllers/expenses.controller.js')


const router  = express.Router();


router.get('/', expensesGetController)
 
router.post('/', expensesPostController)


router.put('/:id', expensesPutController)


router.delete('/:id', expensesDeleteController)

router.get('/summary', expenseSummary)



module.exports = {
    router
}