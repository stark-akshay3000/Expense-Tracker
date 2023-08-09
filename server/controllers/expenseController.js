const Expense = require("../models/expensemodel");
const asyncHandler = require("express-async-handler");
const create = asyncHandler(async (req, res) => {
    const { title, price, date } = req.body;
    
    if (!title || !price || !date) {
        res.status(401);
        throw new Error("Please provide all the filled");
    }
    const obj = {
        user: req.user.id,
        title,
        price,
        date,
    };

    const response = await Expense.create({
        user: req.user.id,
        title,
        price,
        date,
    });

    if (!response) {
        res.status(401);
        throw new Error("Oops something wrong");
    }

    res.status(200).json(response);
});
const showallexpense = asyncHandler(async (req, res) => {
    const response = await Expense.find({ user: req.user.id });

    res.status(200).json(response);
});
const deleteexpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
        res.status(400);
        throw new Error("Expense Data  not found");
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    // Make sure the logged in user matches the goal user
    if (expense.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const response = await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ response, message: "deleted succesfully" });
});
const updateexpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
        res.status(400);
        throw new Error("Expense Data not Found");
    }
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }
    if (expense.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    const response = await Expense.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json({ response, message: "updated sucessfully" });
});
module.exports = {
    create,
    showallexpense,
    deleteexpense,
    updateexpense,
};
