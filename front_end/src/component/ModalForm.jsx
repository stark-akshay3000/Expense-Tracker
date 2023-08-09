import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { create, updateexpense } from "../redux/expenseSlice";
import { setIsopen } from "../redux/modalSlice";
import "../component/FormComponent.css";

const ModalForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { editFormData } = useSelector((state) => state.modal);
    const [enteredTitle, setEnteredTitle] = useState(editFormData.title);
    const [enteredAmount, setEnteredAmount] = useState(editFormData.price);
    const [enteredDate, setEnteredDate] = useState(
        formatDate(new Date(editFormData.date))
    );
    console.log(enteredDate);
    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    };
    const priceChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    };

    const dateChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredDate(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const expenseData = {
            _id: editFormData._id,
            title: enteredTitle,
            price: enteredAmount,
            date: new Date(enteredDate),
        };
        // console.log(expenseData.date);
        dispatch(updateexpense(expenseData));
    };

    const cancelHandler = () => {
        dispatch(setIsopen());
    };

    function formatDate(date) {
        const date1 = date.toISOString();

        const parts = date1.split("T")[0].split("-");

        const formattedDate = `${parts[0]}-${parts[1]}-${parts[2]}`;

        return formattedDate;
    }

    return (
        <div className="form_container">
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
                    </div>
                    <div className="new-expense__control">
                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            min="2020-01-01"
                            max="2024-12-31"
                            value={enteredDate}
                            onChange={dateChangeHandler}
                        />
                    </div>
                </div>
                <div className="new-expense__actions">
                    <button
                        type="button"
                        onClick={cancelHandler}
                        className="new-expense__actionsitem"
                    >
                        Back
                    </button>
                    <button type="submit" className="new-expense__actionsitem">
                        Make Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModalForm;
