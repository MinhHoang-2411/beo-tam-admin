import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { Action } from "../../types/actions";
import { orderActions } from "./orderSlice";
import OrderApi from "../../api/order";
import { alertActions } from "../alert/alertSlice";
import { layoutActions } from "../layout/layoutSlice";

function* handleGetListOrders(action: Action) {
  try {
    let params;
    if (action.payload.page_size) {
      params = action.payload;
    } else {
      params = { page: 1, page_size: 10 };
    }
    const response: { data: { data: any } } = yield call(
      OrderApi.getListOrders,
      params
    );
    console.log({ response });
    const payload = {
      data: response.data.data.items,
      paginate: {
        limit: action.payload.page_size || 10,
        page: action.payload.page || 1,
        total_page: response.data.data.totalPages,
        totalItems: response.data.data.totalItems,
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

function* handleDeleteOrder(action: Action) {
  try {
    const id = action.payload;
    yield put(layoutActions.startLayoutLoading());
    yield call(OrderApi.deleteOrder, id);
    yield put(orderActions.deleteOrderSuccess());
    yield put(orderActions.getListOrders({}));
    yield put(layoutActions.endLayoutLoading());
    yield put(
      alertActions.showAlert({
        text: "Xóa đơn hàng thành công",
        type: "success",
      })
    );
  } catch (error) {
    yield put(layoutActions.endLayoutLoading());
    yield put(orderActions.deleteOrderFailed());
    yield put(
      alertActions.showAlert({
        text: "Xóa đơn hàng thất bại",
        type: "error",
      })
    );
  }
}

function* handleCreateOrder(action: Action) {
  try {
    const params = action.payload.data;
    yield put(layoutActions.startLayoutLoading());
    yield call(OrderApi.createOrder, params);
    yield put(orderActions.createOrderSuccess());
    yield put(layoutActions.endLayoutLoading());
    action.payload?.onNext()
    yield put(
      alertActions.showAlert({
        text: "Tạo đơn hàng thành công",
        type: "success",
      })
    );
  } catch (error) {
    yield put(layoutActions.endLayoutLoading());
    yield put(orderActions.createOrderFailed());
    yield put(
      alertActions.showAlert({
        text: "Tạo đơn hàng thất bại",
        type: "error",
      })
    );
  }
}

function* watchOrderFlow() {
  yield all([
    takeLatest(orderActions.getListOrders.type, handleGetListOrders),
    takeLatest(orderActions.getOrderDetail.type, handleGetDetailOrder),
    takeLatest(orderActions.deleteOrder.type, handleDeleteOrder),
    takeLatest(orderActions.createOrder.type, handleCreateOrder),
  ]);
}

export function* orderSaga() {
  yield fork(watchOrderFlow);
}
