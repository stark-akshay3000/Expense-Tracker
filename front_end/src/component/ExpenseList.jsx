import React, { useEffect, useState } from "react";

import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";

import { useSelector, useDispatch } from "react-redux";
import { getAll, reset, setYear } from "../redux/expenseSlice";
import { useNavigate } from "react-router-dom";
import { setIsopen } from "../redux/modalSlice";
import { logout } from "../redux/authSlice";

const ExpensesList = () => {
    const { expense, isError, reRun, message, selectedYear } = useSelector(
        (state) => state.expense
    );

    const exp = useSelector((state) => state.expense);

    const expensearray = exp.expense;

    const { user } = useSelector((state) => state.auth);
    // const [selectedYear, setSelectedYear] = useState("ALL");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state) => state.modal);

    const onSelect = (e) => {
        dispatch(setYear(e.target.value));
    };

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        if (isError) {
            if (message === "JWT expried") {
                dispatch(logout());
                // localStorage.removeItem("user");
                // navigate("/login");
            } else {
                console.log(message);
            }
        }

        if (isOpen == true) {
            dispatch(setIsopen());
        }
        dispatch(getAll());

        return () => {
            dispatch(reset());
        };
    }, [user, navigate, isError, reRun, dispatch]);

    if (expense.length === 0) {
        return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
    }

    return (
        <div>
            <div style={{ textAlignLast: "end", padding: ".5rem" }}>
                <label
                    htmlFor="selector"
                    style={{ fontSize: "1.3rem", padding: "2px" }}
                >
                    <b>Year:</b>
                </label>
                <select
                    onChange={onSelect}
                    name="selector"
                    defaultValue="select"
                    style={{
                        fontSize: "1.2rem",
                        padding: ".2rem",
                        margin: ".2rem",
                        width: "5rem",
                        border: "3px solid black",
                        borderRadius: "8px",
                    }}
                >
                    <option value="ALL">select</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                </select>
            </div>
            <ul className="expenses-list ">
                {expense
                    .map((item) => {
                        if (selectedYear === "ALL") {
                            return <ExpenseItem key={item._id} item={item} />;
                        } else {
                            const d = new Date(item.date);

                            if (selectedYear === d.getFullYear().toString()) {
                                return (
                                    <ExpenseItem key={item._id} item={item} />
                                );
                            }
                        }
                    })
                    .reverse()}
            </ul>
        </div>
    );
};

export default ExpensesList;
