import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "../../types/pagination";
import { Category, Product } from "../../types/product";

interface orderState {
  listProducts: Product[] | null;
  loadingGetListProducts: boolean;
  listCategory: Category[];
  loadingGetListCategory: boolean;
  productDetail: null | Product;
  loadingGetDetailProduct: boolean;
  pagination: null | Pagination;
  temporarylistImgUrl: any[];
  listImgUrls: any[];
  isUploadImgs: boolean;
  loadingCreateProduct: boolean;
}

const initialState: orderState = {
  listProducts: null,
  listCategory: [],
  loadingGetListProducts: false,
  loadingGetListCategory: false,
  productDetail: null,
  loadingGetDetailProduct: false,
  pagination: null,
  temporarylistImgUrl: [],
  listImgUrls: [],
  isUploadImgs: false,
  loadingCreateProduct: false,
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

    getListCategory(state, action) {
      state.loadingGetListCategory = true;
    },
    getListCategorySuccess(state, action) {
      state.loadingGetListCategory = false;
      state.listCategory = action.payload;
    },
    getListCategoryFailed(state) {
      state.loadingGetListCategory = false;
    },

    createProduct(state, action) {
      state.loadingCreateProduct = true;
    },
    createProductSuccess(state) {
      state.loadingCreateProduct = false;
    },
    createProductFailed(state) {
      state.loadingCreateProduct = false;
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

    uploadImages(state, action) {
      state.isUploadImgs = true;
    },
    uploadImagesSuccess(state, action) {
      state.isUploadImgs = false;
      state.listImgUrls = action.payload;
    },
    uploadImagesFailed(state) {
      state.isUploadImgs = false;
    },
  },
});

// Actions
export const productActions = product.actions;
// Reducer
const productReducer = product.reducer;
export default productReducer;
