const { Router } = require('express');
const authController = require('../controllers/authController');
const incomeController = require('../controllers/incomeController');
const expenseController = require('../controllers/expenseController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.post('/addincome', requireAuth, incomeController.addIncome);
router.get('/getincomes', requireAuth, incomeController.getIncomes);
router.delete('/deleteincome/:id', requireAuth, incomeController.deleteIncome);
router.post('/addexpense', requireAuth, expenseController.addExpense);
router.get('/getexpenses', requireAuth, expenseController.getExpenses);
router.delete('/deleteexpense/:id', requireAuth, expenseController.deleteExpense);



module.exports = router;