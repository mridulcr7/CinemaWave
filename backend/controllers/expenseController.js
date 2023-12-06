const Expense = require("../models/Expense");

module.exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    if (!title || !category || !description || !date) {
        return req.status(400).json("Enter All Fields");
    }

    if (amount <= 0 || isNaN(amount)) {
        return req.status(400).json("Amount must be an positive integer");
    }

    const user = req.user;

    try {
        const user_id = user._id;
        const new_expense = await Expense.create({ title, amount, category, description, date, user_id });
        user.expense.push(new_expense._id);
        res.status(201).json({ new_expense, user });
    }
    catch (err) {

        res.status(500).json({ err });
    }
}

module.exports.getExpenses = async (req, res) => {

    try {
        const user = req.user;
        const user_expenses = user.expenses;
        user_expenses.sort({ createdAt: -1 });
        res.status(201).json({ user_expenses });
    }
    catch (err) {
        res.status(500).json({ err });
    }
}

module.exports.deleteExpense = async (req, res) => {

    try {
        const del_expense = await Expense.findById(req.params.id);
        //  console.log(post._id);
        if (!del_expense) {
            res.status(404).json({
                success: false,
                message: "Expense not found"
            })
        }
        const user = req.user;
        const index = user.expenses.indexOf(del_expense._id);
        user.expenses.splice(index, 1);
        await Expense.deleteOne({ _id: req.params.id });
        await user.save();
        res.status(200).json({
            success: true,
            message: "Expense Deleted"
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}