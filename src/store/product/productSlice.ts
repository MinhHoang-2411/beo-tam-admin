import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "../../types/pagination";
import { Product } from "../../types/product";

interface orderState {
  listProducts: Product[] | null;
  loadingGetListProducts: boolean;
  productDetail: null | Product;
  pagination: null | Pagination;
}

const initialState: orderState = {
  listProducts: null,
  loadingGetListProducts: false,
  productDetail: null,
  pagination: null,
};

const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    getListProducts(state, action) {
      state.loadingGetListProducts = true;
    },
    getListProductsSuccess(state, action) {
      state.listProducts = action.payload.data;
      state.pagination = action.payload.paginate;
      state.loadingGetListProducts = false;
    },
    getListProductsFailed(state) {
      state.loadingGetListProducts = false;
      state.listProducts = [];
    },
    chooseProductDetail(state, action) {
      state.productDetail = action.payload;
    },
    resetProductDetail(state, action) {
      state.productDetail = null;
    },
  },
});

// Actions
export const productActions = product.actions;
// Reducer
const productReducer = product.reducer;
export default productReducer;
