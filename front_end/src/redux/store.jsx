import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import expenseSlice from "./expenseSlice";
import modalSlice from "./modalSlice";
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        expense: expenseSlice.reducer,
        modal :modalSlice.reducer,
    },
});
export default store;
