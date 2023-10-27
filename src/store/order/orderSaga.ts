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
    const response: { data: { data: any } } = yield call(
      OrderApi.getListOrders,
      params
    );
    console.log({ response });
    const payload = {
      data: response.data.data.items,
      paginate: {
        limit: action.payload.per_page || 10,
        page: action.payload.page || 1,
        total_page: response.data.data.totalPages,
        total_records: response.data.data.totalItem,
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

function* handleGetDetailOrder(action: Action) {
  try {
    const id = action.payload;
    const response: { data: { data: any } } = yield call(
      OrderApi.getDetailOrder,
      id
    );
    console.log({ response });
    yield put(orderActions.getOrderDetailSuccess(response.data.data));
  } catch (error) {
    yield put(orderActions.getOrderDetailFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy danh sách đơn hàng",
        type: "error",
      })
    );
  }
}

function* watchOrderFlow() {
  yield all([
    takeLatest(orderActions.getListOrders.type, handleGetListOrders),
    takeLatest(orderActions.getOrderDetail.type, handleGetDetailOrder),
  ]);
}

export function* orderSaga() {
  yield fork(watchOrderFlow);
}
