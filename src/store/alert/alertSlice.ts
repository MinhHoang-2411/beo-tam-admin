import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface AlertModel {
  alert: boolean;
  typeAlert: "info" | "success" | "warning" | "error";
}

const initialState: AlertModel = {
  alert: false,
  typeAlert: "success",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state, action) {
      state.alert = action.payload.text;
      state.typeAlert = action.payload.type;
      toast[state.typeAlert](state.alert, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    cancelAlert(state, action: PayloadAction) {
      state.alert = false;
      state.typeAlert = "success";
    },
  },
});

// Actions
export const alertActions = alertSlice.actions;

// Reducer
const alertReducer = alertSlice.reducer;
export default alertReducer;
