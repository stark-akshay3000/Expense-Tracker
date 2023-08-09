import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { close } from "../redux/authSlice";
import Card from "./Card";
import classes from "./EditModal.module.css";
import ModalForm from "./ModalForm";
const Modal = (props) => {
    const dispatch = useDispatch();
    const buttonTrial = () => {
        dispatch(close());
    };
    return (
        <div>
            <div className={classes.backdrop} onClick={buttonTrial} />
            <Card className={classes.modal}>
                <header className={classes.header}>
                    <h2>Edit Expense</h2>
                </header>
                <div>
                    <ModalForm />
                </div>
            </Card>
        </div>
    );
};
export default Modal;
