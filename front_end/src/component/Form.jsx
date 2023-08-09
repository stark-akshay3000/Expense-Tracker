import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import calender from "../assets/calender.svg";
import { create } from "../redux/expenseSlice";
import "./FormComponent.css";

const Form = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("");
    const [enteredDate, setEnteredDate] = useState("");
    const [error, setError] = useState({
        title: false,
        price: false,
        date: false,
    });
    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
        setError({ ...error, [event.target.name]: false });
    };

    const priceChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
        setError({ ...error, [event.target.name]: false });
    };

    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
        setError({ ...error, [event.target.name]: false });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        let { title, price, date } = error;

        if (enteredAmount === "") price = true;
        if (enteredTitle === "") title = true;
        if (enteredDate === "") date = true;
        if (!price && !title && !date) {
            const expenseData = {
                title: enteredTitle,
                price: enteredAmount,
                date: new Date(enteredDate),
            };

            dispatch(create(expenseData));
            setEnteredTitle("");
            setEnteredAmount("");
            setEnteredDate("");
        } else {
            setError({
                title,
                price,
                date,
            });
        }
    };
    const cancelHandler = () => {
        setEnteredTitle("");
        setEnteredAmount("");
        setEnteredDate("");
        setError({
            title: false,
            price: false,
            date: false,
        });
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={enteredTitle}
                        onChange={titleChangeHandler}
                    />
                    {error.title && (
                        <p className="error">Please add the title</p>
                    )}
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        name="price"
                        value={enteredAmount}
                        onChange={priceChangeHandler}
                    />
                    {error.price && (
                        <p className="error">Please add theprice</p>
                    )}
                </div>
                <div className="new-expense__control">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                        }}
                    >
                        <label>Date</label>
                    </div>
                    <input
                        type="date"
                        name="date"
                        min="2020-01-01"
                        max="2024-12-31"
                        value={enteredDate}
                        onChange={dateChangeHandler}
                    />

                    {error.date && <p className="error">Please add the date</p>}
                </div>
            </div>
            <div className="new-expense__actions">
                <button
                    type="button"
                    onClick={cancelHandler}
                    className="new-expense__actionsitem"
                >
                    Cancel
                </button>
                <button type="submit" className="new-expense__actionsitem">
                    Add Expense
                </button>
            </div>
        </form>
    );
};

export default Form;
