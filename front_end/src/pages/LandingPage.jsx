import React from "react";
import "./LandingPage.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../component/Home";
import backgroundexpensetracker from "../assets/backgroundexpensetracker.svg";
import { useSelector } from "react-redux";

const LandingPage = () => {
    const { user } = useSelector((state) => state.auth);
    const myStyle = {
        backgroundImage: `url(${backgroundexpensetracker})`,
        height: "100vh",
        marginTop: "-70px",
        fontSize: "50px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    return (
        <div className="landing-page" style={myStyle}>
            <h1>Welcome to Expense Tracker</h1>
            <div className="buttons">
                <button className="login-button">
                    {user ? (
                        <Link to="/DashBoard" element={<Home />}>
                            Enter
                        </Link>
                    ) : (
                        <Link to="/login" element={<Login />}>
                            Login
                        </Link>
                    )}
                </button>

                <button className="signup-button">
                    {user ? (
                        <Link to="/DashBoard" element={<Home />}>
                            Sign Up
                        </Link>
                    ) : (
                        <Link to="/signup" element={<Signup />}>
                            Sign Up
                        </Link>
                    )}
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
