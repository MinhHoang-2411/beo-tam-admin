import { createSlice } from "@reduxjs/toolkit";

interface LayoutType {
  theme: "dark" | "light";
  isCollapseSidebar: boolean;
  authState: "login" | "register";
  isOpenAddOrEditAdminModal: boolean;
  isOpenAddOrEditCustomerModal: boolean;
  isLayoutLoading: boolean;
}

const initialState: LayoutType = {
  theme: "light",
  isCollapseSidebar: false,
  authState: "login",
  isOpenAddOrEditAdminModal: false,
  isOpenAddOrEditCustomerModal: false,
  isLayoutLoading: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    changeTheme(state, action) {
      state.theme = action.payload;
    },
    toggleCollapseSidebar(state) {
      state.isCollapseSidebar = !state.isCollapseSidebar;
    },
    changeAuthState(state) {
      if (state.authState == "login") {
        state.authState = "register";
      } else {
        state.authState = "login";
      }
    },

    openModalAdmin(state) {
      state.isOpenAddOrEditAdminModal = true;
    },
    closeModalAdmin(state) {
      state.isOpenAddOrEditAdminModal = false;
    },

    openModalCustomer(state) {
      state.isOpenAddOrEditCustomerModal = true;
    },
    closeModalCustomer(state) {
      state.isOpenAddOrEditCustomerModal = false;
    },

    startLayoutLoading(state) {
      state.isLayoutLoading = true;
    },
    endLayoutLoading(state) {
      state.isLayoutLoading = false;
    },
  },
});

// Actions
export const layoutActions = layoutSlice.actions;
// Reducer
const layoutReducer = layoutSlice.reducer;
export default layoutReducer;
