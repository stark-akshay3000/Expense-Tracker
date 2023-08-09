import { createSlice } from "@reduxjs/toolkit";
export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        editFormData:"",
        isOpen: false,
      
    },
    reducers: {
        setIsopen: (state) => {
            state.isOpen = !state.isOpen;
        },
        setEditFormData:(state,action)=>{
            state.editFormData=action.payload;
        }
        
    },
});
export const { setIsopen,setEditFormData } = modalSlice.actions;
export default modalSlice;
