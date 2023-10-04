import { createSlice } from "@reduxjs/toolkit";

interface IModal {
  isShow: boolean;
  title: string | null;
  content: any | null;
  onAction: (() => void) | null;
  url?: string | null;
  buttonText: string | null;
}

const defaultValue: IModal = {
  isShow: false,
  title: null,
  content: null,
  onAction: null,
  url: null,
  buttonText: null,
};

const initialState = { data: defaultValue };

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, action) {
      state.data = {
        ...state.data,
        ...action.payload,
        isShow: true,
      };
    },
    closeModal(state) {
      state.data = defaultValue;
    },
  },
});

// Actions
export const modalActions = modalSlice.actions;

// Reducer
const modalReducer = modalSlice.reducer;
export default modalReducer;
