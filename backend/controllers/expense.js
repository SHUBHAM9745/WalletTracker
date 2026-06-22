const Expense = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    // Validations
    if (!title || !category || !description || !date) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0)  {
        return res.status(400).json({ message: "Amount must be a positive number!" });
    }

    try {
        const expense = new Expense({
    title,
    amount: Number(amount),
    category,
    description,
    date
});

        await expense.save();
        console.log("✅ Expense Saved:", expense);

        res.status(200).json({ message: "Expense Added", data: expense });
    } catch (error) {
        console.error("❌ Add Expense Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getExpense = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        console.error("❌ Get Expenses Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Expense.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Expense not found!" });
        }
        res.status(200).json({ message: "Expense Deleted" });
    } catch (error) {
        console.error("❌ Delete Expense Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
