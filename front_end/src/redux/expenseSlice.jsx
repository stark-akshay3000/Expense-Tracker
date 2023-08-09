import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import expenseService from "./expenseService";
// import {useSelector} f
const initialState = {
    expense: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    reRun: false,

    message: "",
    selectedYear: "ALL",
};

export const create = createAsyncThunk(
    "expense/create",
    async (expenseData, thunkAPI) => {
        try {
            const token = JSON.parse(localStorage.getItem("user"));

            const response = await expenseService.createexpense(
                expenseData,
                token
            );

            return response;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const getAll = createAsyncThunk(
    "expense/getALL",
    async (_, thunkAPI) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));

            const response = await expenseService.getexpense(token);
            return response;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const deleteexpense = createAsyncThunk(
    "expense/deleteexpense",
    async (id, thunkAPI) => {
        try {
            const token = JSON.parse(localStorage.getItem("user"));
            const response = await expenseService.deleteexpense(id, token);
            return response;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const updateexpense = createAsyncThunk(
    "expense/updateexpense",
    async (expenseData, thunkAPI) => {
        try {
            const token = JSON.parse(localStorage.getItem("user"));
            const response = await expenseService.updateexpense(
                expenseData,
                token
            );
            return response;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        reset: (state) => initialState,
        setYear: (state, action) => {
            state.selectedYear = action.payload;
        },
        setSuccess: (state) => {
            if (state.isSuccess === true) {
                state.isSuccess = false;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(create.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(create.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.expense.push(action.payload);
                state.message = "Expense Added succesfully";
            })
            .addCase(create.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAll.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.expense = action.payload;
                // console.log(state.expense);
            })
            .addCase(getAll.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteexpense.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteexpense.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                state.expense = state.expense.filter(
                    (item) => item._id !== action.payload.response._id
                );
            })
            .addCase(deleteexpense.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateexpense.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateexpense.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                if (action.payload) {
                    state.reRun = !state.reRun;
                }
            })
            .addCase(updateexpense.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});
export const { reset, setYear,setSuccess } = expenseSlice.actions;
export default expenseSlice;
