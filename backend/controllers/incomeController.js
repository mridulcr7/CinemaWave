const Income = require("../models/Income");


module.exports.addIncome = async (req, res) => {
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
        console.log(user_id);
        const new_income = await Income.create({ title, amount, category, description, date, user:user_id });
        user.incomes.push(new_income._id);
        await user.save();

        res.status(201).json({ new_income, user });
    }
    catch (err) {

        res.status(500).json({ err });
    }
}

module.exports.getIncomes = async (req, res) => {

    try {
        const user = req.user;
        const user_incomes = user.incomes;
        user_incomes.sort({ createdAt: -1 });
        res.status(201).json({ user_incomes });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports.deleteIncome = async (req, res) => {

    try {
        const del_income = await Income.findById(req.params.id);
        //  console.log(post._id);
        if (!del_income) {
            res.status(404).json({
                success: false,
                message: "Income not found"
            })
        }
        const user = req.user;
        const index = user.incomes.indexOf(del_income._id);
        user.incomes.splice(index, 1);
        await Income.deleteOne({ _id: req.params.id });
        await user.save();
        res.status(200).json({
            success: true,
            message: "Income Deleted"
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