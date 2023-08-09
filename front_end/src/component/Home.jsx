import React, { useEffect } from "react";
import Form from "../component/Form";
import ExpensesList from "./ExpenseList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Chart from "./Chart";
import Header from "./Header";
import ErrorModal from "./ErrorModal";
import Notification from "./Notification";
import Spinner from "./Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setSuccess } from "../redux/expenseSlice";
const Home = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { isError, isLoading, message, expense, isSuccess } = useSelector(
        (state) => state.expense
    );
    const navigate = useNavigate();

    useEffect(() => {
        !user && navigate("/login");
    }, [user]);

    return (
        user && (
            <>
                <div style={{ marginBottom: "15px" }}>
                    <Header />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                        marginBottom: "15px",
                    }}
                >
                    <Chart />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#eef6f5",
                            width: "60%",
                            borderRadius: "10px",
                            border: "solid black",
                            padding: "10px",
                        }}
                    >
                        <Form />
                    </div>
                </div>
                <div
                    style={{
                        // backgroundColor: "greenyellow",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            marginTop: "20px",
                            backgroundColor: "#eef6f5",
                            width: "60%",
                            borderRadius: "10px",
                            border: "solid black",
                            padding: "10px",
                        }}
                    >
                        <ExpensesList />
                    </div>
                </div>
                {isLoading && <Spinner />}
            </>
        )
    );
};

export default Home;
