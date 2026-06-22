const Income = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    if (!title || !category || !description || !date) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
        return res.status(400).json({ message: "Amount must be a positive number!" });
    }

    try {
        const income = new Income({
            title,
            amount: Number(amount),
            category,
            description,
            date
        });

        await income.save();
        console.log("✅ Income Saved:", income);
        res.status(200).json({ message: "Income Added", data: income });
    } catch (error) {
        console.error("❌ Add Income Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error("❌ Get Incomes Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Income.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Income not found!" });
        }
        res.status(200).json({ message: "Income Deleted" });
    } catch (error) {
        console.error("❌ Delete Income Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};