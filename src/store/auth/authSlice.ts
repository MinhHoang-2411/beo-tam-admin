import { createSlice } from "@reduxjs/toolkit";
import { CurrentUser } from "../../types/user";
import { getAuth } from "../../utils/auth";

interface authState {
  isLoggedIn: boolean;
  logging: boolean;
  loadingRegister: boolean;
  dataUser: CurrentUser | undefined;
  loadingChangePwd: boolean;
  loadingSendEmail: boolean;
  loadingVerifyOtp: boolean;
  loadingResetPwd: boolean;
  tokenVerifyPwd: string;
  tokenResetPwd: string;
}

const token = localStorage.getItem("fakeToken");

const initialState: authState = {
  isLoggedIn: token ? true : false, // logged
  logging: false, // loading login
  loadingRegister: false, //loading register
  dataUser: JSON.parse(localStorage.getItem("current_user") as string) || {},
  loadingChangePwd: false,
  loadingSendEmail: false,
  loadingVerifyOtp: false,
  loadingResetPwd: false,
  tokenVerifyPwd: "",
  tokenResetPwd: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.logging = true;
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.logging = false;
      state.dataUser = action.payload;
    },
    loginFailed(state) {
      state.logging = false;
    },
    register(state, action) {
      state.logging = true;
    },
    registerSuccess(state) {
      state.logging = false;
    },
    registerFailed(state) {
      state.logging = false;
    },

    getDataUser(state, action) {
      state.dataUser = action.payload;
    },

    logout(state, action) {
      state.isLoggedIn = false;
      state.dataUser = undefined;
    },

    changePwd(state, action) {
      state.loadingChangePwd = true;
    },
    changePwdSuccess(state) {
      state.loadingChangePwd = false;
    },
    changePwdFailed(state) {
      state.loadingChangePwd = false;
    },

    sendEmail(state, action) {
      state.loadingSendEmail = true;
    },
    sendEmailSuccess(state, action) {
      state.loadingSendEmail = false;
      state.tokenVerifyPwd = action.payload;
    },
    sendEmailFailed(state) {
      state.loadingSendEmail = false;
    },

    verifyOtp(state, action) {
      state.loadingVerifyOtp = true;
    },
    verifyOtpSuccess(state, action) {
      state.loadingVerifyOtp = false;
      state.tokenResetPwd = action.payload;
    },
    verifyOtpFailed(state) {
      state.loadingVerifyOtp = false;
    },

    resetPwd(state, action) {
      state.loadingResetPwd = true;
    },
    resetPwdSuccess(state) {
      state.loadingResetPwd = false;
    },
    resetPwdFailed(state) {
      state.loadingResetPwd = false;
    },
  },
});

// Actions
export const authActions = authSlice.actions;
// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
