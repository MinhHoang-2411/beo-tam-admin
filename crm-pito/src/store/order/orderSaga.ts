import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { Action } from "../../types/actions";
import { orderActions } from "./orderSlice";
import OrderApi from "../../api/order";
import { alertActions } from "../alert/alertSlice";

function* handleGetListOrders(action: Action) {
  try {
    let params;
    if (action.payload.per_page) {
      params = action.payload;
    } else {
      params = { page: 1, per_page: 10 };
    }
    const response: { data: any; headers: any } = yield call(
      OrderApi.getListOrders,
      params
    );
    const payload = {
      data: response.data,
      paginate: {
        limit: action.payload.per_page || 10,
        page: action.payload.page || 1,
        total_page: response.headers["x-wp-totalpages"],
        total_records: response.headers["x-wp-total"],
      },
    };
    yield put(orderActions.getListOrdersSuccess(payload));
  } catch (error) {
    yield put(orderActions.getListOrdersFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy danh sách đơn hàng",
        type: "error",
      })
    );
  }
}

function* watchOrderFlow() {
  yield all([takeLatest(orderActions.getListOrders.type, handleGetListOrders)]);
}

export function* orderSaga() {
  yield fork(watchOrderFlow);
}
