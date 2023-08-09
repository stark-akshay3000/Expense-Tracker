import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/authSlice";
import { Link } from "react-router-dom";
import ErrorModal from "../component/ErrorModal";
import "./Form.css";

const Form = () => {
    const { user, isError, message } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [enteredname, setEnteredname] = useState("");
    const [enteredemail, setEnteredemail] = useState("");
    const [enteredpassword, setEnteredpassword] = useState("");
    const [error, setError] = useState({
        name: false,
        email: false,
        password: false,
    });
    const nameChangeHandler = (event) => {
        setEnteredname(event.target.value);
        setError({ ...error, [event.target.name]: false });
    };

    const emailChangeHandler = (event) => {
        setEnteredemail(event.target.value);
        setError({ ...error, [event.target.name]: false });
    };

    const passwordChangeHandler = (event) => {
        setEnteredpassword(event.target.value);
        setError({ ...error, [event.target.name]: false });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        let { name, email, password } = error;

        if (enteredemail === "") email = true;
        if (enteredname === "") name = true;
        if (enteredpassword === "") password = true;
        if (!email && !name && !password) {
            const userData = {
                name: enteredname,
                email: enteredemail,
                password: enteredpassword,
            };
            dispatch(register(userData));

            // props.onSaveExpenseData(expenseData);
            setEnteredname("");
            setEnteredemail("");
            setEnteredpassword("");
        } else {
            setError({
                name,
                email,
                password,
            });
        }
    };
    const cancelHandler = () => {
        setEnteredname("");
        setEnteredemail("");
        setEnteredpassword("");
        setError({
            name: false,
            email: false,
            password: false,
        });
    };
    useEffect(() => {
        if (user && !isError) {
            navigate("/");
        }
    }, [user, isError]);
    return (
        <>
            <div className="main_div">
                <div className="login_main_div">
                    <form onSubmit={submitHandler}>
                        <div className="new-expense__controls">
                            <div className="new-expense__control">
                                <label>name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={enteredname}
                                    onChange={nameChangeHandler}
                                />
                                {error.name && (
                                    <p className="error">Please add the name</p>
                                )}
                            </div>
                            <div className="new-expense__control">
                                <label>email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={enteredemail}
                                    onChange={emailChangeHandler}
                                />
                                {error.email && (
                                    <p className="error">
                                        Please add the email
                                    </p>
                                )}
                            </div>
                            <div className="new-expense__control">
                                <label>password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={enteredpassword}
                                    onChange={passwordChangeHandler}
                                />
                                {error.password && (
                                    <p className="error">
                                        Please add the password
                                    </p>
                                )}
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
                            <button
                                type="submit"
                                className="new-expense__actionsitem"
                            >
                                SignUp
                            </button>
                        </div>
                        <div className="extra">
                            <Link to="/login">Already have an account?</Link>
                        </div>
                    </form>
                </div>
            </div>
            {isError && <ErrorModal message={message} title={"Error!"} />}
        </>
    );
};

export default Form;
