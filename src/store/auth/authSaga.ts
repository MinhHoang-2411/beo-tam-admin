import { call, delay, fork, put, takeLatest, all } from "redux-saga/effects";
import { authActions } from "./authSlice";
import { Action } from "../../types/actions";
import { alertActions } from "../alert/alertSlice";

function* handleLogin(action: Action) {
  try {
    const { params, onNavigate } = action.payload;
    if (params.email == "admin@gmail.com" && params.password == "123456") {
      yield put(authActions.loginSuccess({ name: "admin" }));
      localStorage.setItem("fakeToken", "123");
      onNavigate?.();
    } else {
      yield put(authActions.loginFailed());
      yield put(
        alertActions.showAlert({
          text: "Email hoặc mật khẩu bạn nhập không khớp với hệ thống, vui lòng kiểm tra lại",
          type: "error",
        })
      );
    }
  } catch (error) {
    yield put(authActions.loginFailed());
    yield put(
      alertActions.showAlert({
        text: "Email hoặc mật khẩu bạn nhập không khớp với hệ thống, vui lòng kiểm tra lại",
        type: "error",
      })
    );
  }
}

function* handleLogout(action: Action) {
  yield delay(500);
  localStorage.removeItem("fakeToken");
  action.payload.onNavigate?.();
}

function* watchLoginFlow() {
  yield all([
    takeLatest(authActions.login.type, handleLogin),
    takeLatest(authActions.logout.type, handleLogout),
  ]);
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
