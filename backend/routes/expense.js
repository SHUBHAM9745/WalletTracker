const express = require('express');
const router = express.Router();

// Import expense controller functions
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');

// @route   POST /api/v1/add-expense
// @desc    Add a new expense
router.post('/add-expense', addExpense);

// @route   GET /api/v1/get-expense
// @desc    Get all expenses
router.get('/get-expense', getExpense);

// @route   DELETE /api/v1/delete-expense/:id
// @desc    Delete a specific expense by ID
router.delete('/delete-expense/:id', deleteExpense);

module.exports = router;
