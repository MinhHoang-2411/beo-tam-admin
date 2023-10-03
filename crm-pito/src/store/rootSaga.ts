import { all } from "redux-saga/effects";
import { alertSaga } from "./alert/alertSaga";
import { authSaga } from "./auth/authSaga";
import { orderSaga } from "./order/orderSaga";
import { productSaga as productSaga2 } from "./product/productSaga";

export default function* rootSaga() {
  yield all([alertSaga(), authSaga(), orderSaga(), productSaga2()]);
}
