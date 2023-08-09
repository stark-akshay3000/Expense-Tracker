import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { close } from "../redux/authSlice";
import Card from "./Card";
import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
    const [isOpen, setIsopen] = useState(false);
    const dispatch = useDispatch();
    const buttonTrial = () => {
        dispatch(close());
    };
    return (
        <div>
            <div className={classes.backdrop} onClick={buttonTrial} />
            <Card className={classes.modal}>
                <header className={classes.header}>
                    <h2>{props.title}</h2>
                </header>
                <div className={classes.content}>
                    <p style={{ fontSize: "24px" }}>{props.message}</p>
                </div>
                <footer className={classes.actions}>
                    <button
                        type="button"
                        style={{ background: "dark-grey" }}
                        onClick={buttonTrial}
                    >
                        Okay
                    </button>
                </footer>
            </Card>
        </div>
    );
};
export default ErrorModal;
