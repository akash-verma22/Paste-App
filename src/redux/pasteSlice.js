import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Succesfully");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if(index>=0){
        state.pastes[index] = paste;

        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Updated Succesfully");
      }
      else{
        toast.error("No Paste Found")
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item)=>
      item._id===paste._id);

      if(index>=0){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Deleted!");
      }
      else{
        toast.error("Could Not Delete Paste!")
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
