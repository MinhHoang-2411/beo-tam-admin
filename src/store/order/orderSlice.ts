import { createSlice } from "@reduxjs/toolkit";
import { Order, OrderDetail } from "../../types/order";
import { Pagination } from "../../types/pagination";

interface orderState {
  listOrders: Order[] | null;
  loadingGetListOrders: boolean;
  OrderDetail: null | OrderDetail;
  loadingGetDetailOrder: boolean;
  pagination: null | Pagination;
}

const initialState: orderState = {
  listOrders: null,
  loadingGetListOrders: false,
  OrderDetail: null,
  loadingGetDetailOrder: false,
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

    getOrderDetail(state, action) {
      state.loadingGetDetailOrder = true;
    },
    getOrderDetailSuccess(state, action) {
      state.loadingGetDetailOrder = false;
      state.OrderDetail = action.payload;
    },
    getOrderDetailFailed(state) {
      state.loadingGetDetailOrder = false;
      state.OrderDetail = null;
    },

    chooseOrderDetail(state, action) {
      state.OrderDetail = action.payload;
    },
    resetOrderDetail(state) {
      state.OrderDetail = null;
    },
  },
});

// Actions
export const orderActions = order.actions;
// Reducer
const orderReducer = order.reducer;
export default orderReducer;
