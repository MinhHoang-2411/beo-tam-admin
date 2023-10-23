import { createSlice } from "@reduxjs/toolkit";
import { DetailAdmin, DetailCustomer } from "../../types/user";

interface UserState {
  listAdmin: DetailAdmin[] | null;
  loadingGetListAdmin: boolean;
  adminDetail: null | DetailAdmin;
  loadingAdminDetail: boolean;
  listCustomer: DetailCustomer[] | null;
  loadingGetListCustomer: boolean;
  customerDetail: null | DetailCustomer;
  loadingCustomerDetail: boolean;
  loadingCRUDAdmin: boolean;
  loadingCRUDCustomer: boolean;
  selectedAdmin: null | DetailAdmin;
  selectedCustomer: null | DetailCustomer;
}

const initialState: UserState = {
  listAdmin: null,
  loadingGetListAdmin: false,
  adminDetail: null,
  loadingAdminDetail: false,
  listCustomer: null,
  loadingGetListCustomer: false,
  customerDetail: null,
  loadingCustomerDetail: false,
  loadingCRUDAdmin: false,
  loadingCRUDCustomer: false,
  selectedAdmin: null,
  selectedCustomer: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    getListAdmin(state) {
      state.loadingGetListAdmin = true;
    },
    getListAdminSuccess(state, action) {
      state.listAdmin = action.payload;
      state.loadingGetListAdmin = false;
    },
    getListAdminFailed(state) {
      state.loadingGetListAdmin = false;
      state.listAdmin = [];
    },
    getDetailAdmin(state, action) {
      state.loadingAdminDetail = true;
    },
    getDetailAdminSuccess(state, action) {
      state.adminDetail = action.payload;
      state.loadingAdminDetail = false;
    },
    getDetailAdminFailed(state) {
      state.loadingAdminDetail = false;
    },

    getListCustomer(state) {
      state.loadingGetListCustomer = true;
    },
    getListCustomerSuccess(state, action) {
      state.listCustomer = action.payload;
      state.loadingGetListCustomer = false;
    },
    getListCustomerFailed(state) {
      state.loadingGetListCustomer = false;
      state.listCustomer = [];
    },
    getDetailCustomer(state, action) {
      state.loadingCustomerDetail = true;
    },
    getDetailCustomerSuccess(state, action) {
      state.customerDetail = action.payload;
      state.loadingCustomerDetail = false;
    },
    getDetailCustomerFailed(state) {
      state.loadingCustomerDetail = false;
    },

    createAdmin(state, action) {
      state.loadingCRUDAdmin = true;
    },
    createAdminSuccess(state) {
      state.loadingCRUDAdmin = false;
    },
    createAdminFailed(state) {
      state.loadingCRUDAdmin = false;
    },

    updateAdmin(state, action) {
      state.loadingCRUDAdmin = true;
    },
    updateAdminSuccess(state) {
      state.loadingCRUDAdmin = false;
    },
    updateAdminFailed(state) {
      state.loadingCRUDAdmin = false;
    },

    deleteAdmin(state, action) {
      state.loadingCRUDAdmin = true;
    },
    deleteAdminSuccess(state) {
      state.loadingCRUDAdmin = false;
    },
    deleteAdminFailed(state) {
      state.loadingCRUDAdmin = false;
    },

    createCustomer(state, action) {
      state.loadingCRUDCustomer = true;
    },
    createCustomerSuccess(state) {
      state.loadingCRUDCustomer = false;
    },
    createCustomerFailed(state) {
      state.loadingCRUDCustomer = false;
    },

    updateCustomer(state, action) {
      state.loadingCRUDCustomer = true;
    },
    updateCustomerSuccess(state) {
      state.loadingCRUDCustomer = false;
    },
    updateCustomerFailed(state) {
      state.loadingCRUDCustomer = false;
    },

    deleteCustomer(state, action) {
      state.loadingCRUDCustomer = true;
    },
    deleteCustomerSuccess(state) {
      state.loadingCRUDCustomer = false;
    },
    deleteCustomerFailed(state) {
      state.loadingCRUDCustomer = false;
    },

    selectAdmin(state, action) {
      state.selectedAdmin = action.payload;
    },
    unSelectAdmin(state) {
      state.selectedAdmin = null;
    },
    selectCustomer(state, action) {
      state.selectedCustomer = action.payload;
    },
    unSelectCustomer(state) {
      state.selectedCustomer = null;
    },
  },
});

// Actions
export const userActions = user.actions;
// Reducer
const userReducer = user.reducer;
export default userReducer;
