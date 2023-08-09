import React, { useState } from "react";

import ExpenseDate from "./ExpenseDate";
// import Card from "../UI/Card";
import Modal from "./Modal";
import Form from "./Form";
import "./ExpenseItem.css";
import { deleteexpense, updateexpense, getAll } from "../redux/expenseSlice";
import { useDispatch, useSelector } from "react-redux";
import { setEditFormData, setIsopen } from "../redux/modalSlice";
const ExpenseItem = (props) => {
    const { isOpen, editFormData } = useSelector((state) => state.modal);
    // console.log("expense item is rendering");
    const dispatch = useDispatch();
    const onDelete = () => {
        dispatch(deleteexpense(props.item._id));
    };
    const onEdit = () => {
        const data = props.item;

        dispatch(setEditFormData(data));
        dispatch(setIsopen());
    };
    // useEffect(()=>{

    // },[isOpen]);
    // console.log(props.item);

    return (
        <>
            <li>
                <div className="expense-item">
                    <ExpenseDate date={props.item.date} />
                    <div className="expense-item__description">
                        <h2>{props.item.title}</h2>
                        <div className="expense-item__price">
                            ${props.item.price}
                        </div>

                        <div className="expense-item__button" onClick={onEdit}>
                            <i class="fa fa-edit" aria-hidden="true"></i>
                        </div>
                        <div
                            className="expense-item__button"
                            onClick={onDelete}
                        >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </li>
            {isOpen && editFormData && <Modal />}
        </>
    );
};

export default ExpenseItem;
