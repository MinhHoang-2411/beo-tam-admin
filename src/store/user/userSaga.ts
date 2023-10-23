import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { alertActions } from "../alert/alertSlice";
import { DetailAdmin, DetailCustomer } from "../../types/user";
import userApi from "../../api/user";
import { userActions } from "./userSlice";
import { Action } from "../../types/actions";

function* handleGetListAdmin() {
  try {
    const response: { data: { data: { items: DetailAdmin[] } } } = yield call(
      userApi.getListAdmin
    );
    console.log(response.data.data.items);
    yield put(userActions.getListAdminSuccess(response.data.data.items));
  } catch (error) {
    yield put(userActions.getListAdminFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy danh sách quản trị viên",
        type: "error",
      })
    );
  }
}

function* handleGetDetailAdmin(action: Action) {
  try {
    const id = action.payload;

    const response: { data: { data: DetailAdmin } } = yield call(
      userApi.getDetailAdmin,
      id
    );

    yield put(userActions.getDetailAdminSuccess(response.data.data));
  } catch (error) {
    yield put(userActions.getDetailAdminFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy thông tin chi tiết quản trị viên",
        type: "error",
      })
    );
  }
}

function* handleGetListCustomer() {
  try {
    const response: { data: { data: { items: DetailCustomer[] } } } =
      yield call(userApi.getListCustomer);
    console.log(response.data.data.items);
    yield put(userActions.getListCustomerSuccess(response.data.data.items));
  } catch (error) {
    yield put(userActions.getListCustomerFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy danh sách thành viên",
        type: "error",
      })
    );
  }
}

function* handleGetDetailCustomer(action: Action) {
  try {
    const id = action.payload;

    const response: { data: { data: DetailCustomer } } = yield call(
      userApi.getDetailCustomer,
      id
    );

    yield put(userActions.getDetailCustomerSuccess(response.data.data));
  } catch (error) {
    yield put(userActions.getDetailCustomerFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy thông tin chi tiết thành viên",
        type: "error",
      })
    );
  }
}

function* handleCreateAdmin(action: Action) {
  try {
    const response: { data: any } = yield call(
      userApi.createAdmin,
      action.payload.data
    );
    console.log(response.data);
    yield put(userActions.createAdminSuccess());
    yield put(userActions.getListAdmin());
    action.payload?.onClose();
    yield put(
      alertActions.showAlert({
        text: "Tạo quản trị viên mới thành công",
        type: "success",
      })
    );
  } catch (error) {
    yield put(userActions.createAdminFailed());
    yield put(
      alertActions.showAlert({
        text: "Tạo quản trị viên thất bại",
        type: "error",
      })
    );
  }
}

function* handleCreateCustomer(action: Action) {
  try {
    const response: { data: any } = yield call(
      userApi.createCustomer,
      action.payload.data
    );
    console.log(response.data);
    yield put(userActions.createCustomerSuccess());
    yield put(userActions.getListCustomer());
    action.payload?.onClose();
    yield put(
      alertActions.showAlert({
        text: "Tạo người dùng mới thành công",
        type: "success",
      })
    );
  } catch (error) {
    yield put(userActions.createCustomerFailed());
    yield put(
      alertActions.showAlert({
        text: "Tạo thành viên thất bại",
        type: "error",
      })
    );
  }
}

function* handleUpdateAdmin(action: Action) {
  try {
    const response: { data: any } = yield call(
      userApi.updateAdmin,
      action.payload.data
    );
    console.log(response.data);
    yield put(userActions.updateAdminSuccess());
    yield put(userActions.getListAdmin());
    action.payload?.onClose();
    yield put(
      alertActions.showAlert({
        text: "Chỉnh sửa quản trị viên thành công",
        type: "success",
      })
    );
  } catch (error) {
    yield put(userActions.updateAdminFailed());
    yield put(
      alertActions.showAlert({
        text: "Chỉnh sửa quản trị viên thất bại",
        type: "error",
      })
    );
  }
}

function* handleUpdateCustomer(action: Action) {
  try {
    const response: { data: any } = yield call(
      userApi.updateCustomer,
      action.payload.data
    );
    console.log(response.data);
    yield put(userActions.updateCustomerSuccess());
    yield put(userActions.getListCustomer());
    action.payload?.onClose();
    yield put(
      alertActions.showAlert({
        text: "Chỉnh sửa thành viên thành công",
        type: "success",
      })
    );
  } catch (error) {
    yield put(userActions.updateCustomerFailed());
    yield put(
      alertActions.showAlert({
        text: "Chỉnh sửa thành viên thất bại",
        type: "error",
      })
    );
  }
}

function* handleDeleteAdmin(action: Action) {
  try {
    const response: { data: any } = yield call(
      userApi.deleteAdmin,
      action.payload
    );
    console.log(response.data);
    yield put(userActions.deleteAdminSuccess());
    yield put(userActions.getListAdmin());
    yield put(
      alertActions.showAlert({
        text: "Xóa quản trị viên thành công",
        type: "success",
      })
    );
  } catch (error) {
    yield put(userActions.deleteAdminFailed());
    yield put(
      alertActions.showAlert({
        text: "Xóa quản trị viên thất bại",
        type: "error",
      })
    );
  }
}

function* handleDeleteCustomer(action: Action) {
  try {
    const response: { data: any } = yield call(
      userApi.deleteCustomer,
      action.payload
    );
    console.log(response.data);
    yield put(userActions.deleteCustomerSuccess());
    yield put(userActions.getListCustomer());
    yield put(
      alertActions.showAlert({
        text: "Xóa thành viên thành công",
        type: "success",
      })
    );
  } catch (error) {
    yield put(userActions.deleteCustomerFailed());
    yield put(
      alertActions.showAlert({
        text: "Xóa thành viên thất bại",
        type: "error",
      })
    );
  }
}

function* watchUserFlow() {
  yield all([
    takeLatest(userActions.getListAdmin.type, handleGetListAdmin),
    takeLatest(userActions.getListCustomer.type, handleGetListCustomer),
    takeLatest(userActions.getDetailAdmin.type, handleGetDetailAdmin),
    takeLatest(userActions.getDetailCustomer.type, handleGetDetailCustomer),
    takeLatest(userActions.createAdmin.type, handleCreateAdmin),
    takeLatest(userActions.updateAdmin.type, handleUpdateAdmin),
    takeLatest(userActions.deleteAdmin.type, handleDeleteAdmin),
    takeLatest(userActions.createCustomer.type, handleCreateCustomer),
    takeLatest(userActions.updateCustomer.type, handleUpdateCustomer),
    takeLatest(userActions.deleteCustomer.type, handleDeleteCustomer),
  ]);
}

export function* userSaga() {
  yield fork(watchUserFlow);
}
