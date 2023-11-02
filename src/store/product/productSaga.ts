import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { Action } from "../../types/actions";
import { productActions } from "./productSlice";
import { alertActions } from "../alert/alertSlice";
import ProductApi from "../../api/product";

function* handleGetListOrders(action: Action) {
  try {
    let params;
    if (action.payload.page_size) {
      params = action.payload;
    } else {
      params = { page: 1, page_size: 10 };
    }
    const response: { data: any; headers: any } = yield call(
      ProductApi.getListProducts,
      params
    );
    const payload = {
      data: response.data,
      paginate: {
        limit: action.payload.page_size || 10,
        page: action.payload.page || 1,
        total_page: response.headers["x-wp-totalpages"],
        totalItems: response.headers["x-wp-total"],
      },
    };
    yield put(productActions.getListProductsSuccess(payload));
  } catch (error) {
    yield put(productActions.getListProductsFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy danh sách sản phẩm",
        type: "error",
      })
    );
  }
}

function* watchProductFlow() {
  yield all([
    takeLatest(productActions.getListProducts.type, handleGetListOrders),
  ]);
}

export function* productSaga() {
  yield fork(watchProductFlow);
}
