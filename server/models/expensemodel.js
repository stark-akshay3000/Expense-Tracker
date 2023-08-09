const mongoose = require("mongoose");
const expenseSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: [true, "Please add a text value"],
        },
        price: {
            type: Number,
            required: [true, "Please add a Price "],
        },
        date: {
            type: String,
            required: [true, "Please add a date value"],
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Expense", expenseSchema);
