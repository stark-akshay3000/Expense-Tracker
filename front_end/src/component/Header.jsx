import React from "react";
import "./Header.css"; // Import the CSS file for styling
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";
const Header = () => {
    const dispatch = useDispatch();
    const lg = () => {
       
        dispatch(logout());
    };
    return (
        <header className="header">
            <h1 className="logo">Expense Tracker</h1>
            <button className="logout-button" onClick={lg}>
                Logout
            </button>
        </header>
    );
};

export default Header;
