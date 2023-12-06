const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date:
    {
        type: Date,
        required: true
    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    ,
},
    {
        timestamps: {
            createdAt: 'created_at', // Use `created_at` to store the created date
            updatedAt: 'updated_at' // and `updated_at` to store the last updated date
        }
    });

const Expense = mongoose.model('expense', incomeSchema);

module.exports = Expense;