import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "../../types/pagination";
import { Product } from "../../types/product";

interface orderState {
  listProducts: Product[] | null;
  loadingGetListProducts: boolean;
  productDetail: null | Product;
  loadingGetDetailProduct: boolean;
  pagination: null | Pagination;
  temporarylistImgUrl: any[];
}

const initialState: orderState = {
  listProducts: null,
  loadingGetListProducts: false,
  productDetail: null,
  loadingGetDetailProduct: false,
  pagination: null,
  temporarylistImgUrl: [],
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
    getProductDetail(state, action) {
      state.loadingGetDetailProduct = true;
    },
    getProductDetailSuccess(state, action) {
      state.loadingGetDetailProduct = false;
      state.productDetail = action.payload;
    },
    getProductDetailFailed(state) {
      state.loadingGetDetailProduct = false;
      state.productDetail = null;
    },
    resetProductDetail(state) {
      state.productDetail = null;
    },

    settemporarylistImgUrl(state, action) {
      state.temporarylistImgUrl = action.payload;
    },
    plusTemporaryListImgUrl(state, action) {
      state.temporarylistImgUrl = [
        ...state.temporarylistImgUrl,
        ...action.payload,
      ];
    },
    deleteATemporaryImgUrl(state, action) {
      state.temporarylistImgUrl = [...state.temporarylistImgUrl].filter(
        (item) => item.preview !== action.payload.preview
      );
    },
    resetTemporarylistImgUrl(state) {
      state.temporarylistImgUrl = [];
    },
  },
});

// Actions
export const productActions = product.actions;
// Reducer
const productReducer = product.reducer;
export default productReducer;
