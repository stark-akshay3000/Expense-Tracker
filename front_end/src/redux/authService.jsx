import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
const API_URL = axios.create({ baseURL: "http://localhost:8000" });

// Register user
const register = async (userData) => {
    const response = await API_URL.post("/api/user", userData);

    if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
    }

    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await API_URL.post("/api/user/login", userData);

    if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
    }

    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem("token");
};
const getme = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await API_URL.get("/api/user/getme", config);
    if (response.data) {
        console.log(response.data);
    }
};

const authService = {
    register,
    logout,
    login,
    getme,
};

export default authService;
