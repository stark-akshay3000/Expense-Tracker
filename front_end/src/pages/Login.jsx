import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Form.css";
import { login } from "../redux/authSlice";
import ModalForm from "../component/ModalForm";
import ErrorModal from "../component/ErrorModal";
const Form = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, message } = useSelector((state) => state.auth);

    const [enteredemail, setEnteredemail] = useState("");
    const [enteredpassword, setEnteredpassword] = useState("");
    const [error, setError] = useState({
        email: false,
        password: false,
    });

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
        let { email, password } = error;

        if (enteredemail === "") email = true;

        if (enteredpassword === "") password = true;

        if (!email && !password) {
            const userData = {
                email: enteredemail,
                password: enteredpassword,
            };

            dispatch(login(userData));

            setEnteredemail("");
            setEnteredpassword("");
        } else {
            setError({
                email,
                password,
            });
        }
    };

    useEffect(() => {
        user && navigate("/DashBoard");
    }, [user]);

    const cancelHandler = () => {
        setEnteredemail("");
        setEnteredpassword("");
        setError({
            email: false,
            password: false,
        });
    };

    return (
        <>
            <div className="main_div">
                <div className="login_main_div">
                    <form onSubmit={submitHandler}>
                        <div className="new-expense__controls">
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
                                LOGIN
                            </button>
                        </div>
                        <div className="extra">
                            <Link to="/signup">Don't have account?</Link>
                        </div>
                    </form>
                </div>
            </div>

            {isError && <ErrorModal message={message} title={"Error!"} />}
        </>
    );
};

export default Form;
