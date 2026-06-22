const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [50, 'Title cannot be more than 50 characters']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount must be positive']
    },
    type: {
        type: String,
        default: "expense"
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [100, 'Description should not exceed 100 characters']
    }
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
