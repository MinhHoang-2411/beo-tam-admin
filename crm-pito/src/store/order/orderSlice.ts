import { createSlice } from "@reduxjs/toolkit";
import { Order } from "../../types/order";
import { Pagination } from "../../types/pagination";

interface orderState {
  listOrders: Order[] | null;
  loadingGetListOrders: boolean;
  OrderDetail: null | Order;
  pagination: null | Pagination;
}

const initialState: orderState = {
  listOrders: null,
  loadingGetListOrders: false,
  OrderDetail: null,
  pagination: null,
};

const order = createSlice({
  name: "product",
  initialState,
  reducers: {
    getListOrders(state, action) {
      state.loadingGetListOrders = true;
    },
    getListOrdersSuccess(state, action) {
      state.listOrders = action.payload.data;
      state.pagination = action.payload.paginate;
      state.loadingGetListOrders = false;
    },
    getListOrdersFailed(state) {
      state.loadingGetListOrders = false;
      state.listOrders = [];
    },
    chooseOrderDetail(state, action) {
      state.OrderDetail = action.payload;
    },
    resetOrderDetail(state, action) {
      state.OrderDetail = null;
    },
  },
});

// Actions
export const orderActions = order.actions;
// Reducer
const orderReducer = order.reducer;
export default orderReducer;
