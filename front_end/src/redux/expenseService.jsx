import axios from "axios";

const API_URL = axios.create({ baseURL: "http://localhost:8000" });
const createexpense = async (expenseData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await API_URL.post("/api/expense/", expenseData, config);

    return response.data;
};
const getexpense = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await API_URL.get("/api/expense", config);
    return response.data;
};
const deleteexpense = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await API_URL.delete(`/api/expense/${id}`, config);

    return response.data;
};
const updateexpense = async (expenseData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    console.log(expenseData);
    const response = await API_URL.put(
        `/api/expense/${expenseData._id}`,
        expenseData,
        config
    );
    return response.data;
};

const expenseService = {
    createexpense,
    getexpense,
    deleteexpense,
    updateexpense,
};

export default expenseService;
