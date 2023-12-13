import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { Action } from "../../types/actions";
import { productActions } from "./productSlice";
import { alertActions } from "../alert/alertSlice";
import ProductApi from "../../api/product";
import { layoutActions } from "../layout/layoutSlice";

function* handleGetListProducts(action: Action) {
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
      data: response.data.data.items,
      paginate: {
        limit: action.payload.page_size || 10,
        page: action.payload.page || 1,
        total_page: response.data.data.totalPages,
        totalItems: response.data.data.totalItems,
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

function* handleGetListCategories(action: Action) {
  try {
    let params;
    if (action.payload.page_size) {
      params = action.payload;
    } else {
      params = { page: 1, page_size: 20 };
    }
    const response: { data: any } = yield call(
      ProductApi.getListCategories,
      params
    );
    yield put(productActions.getListCategorySuccess(response.data.data.items));
  } catch (error) {
    yield put(productActions.getListCategoryFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy danh sách danh mục",
        type: "error",
      })
    );
  }
}

function* handleGetProductDetail(action: Action) {
  try {
    const response: { data: any; headers: any } = yield call(
      ProductApi.getDetailProduct,
      action.payload
    );
    yield put(productActions.getProductDetailSuccess(response.data.data));
  } catch (error) {
    yield put(productActions.getProductDetailFailed());
    yield put(
      alertActions.showAlert({
        text: "Không thể lấy thông tin sản phẩm",
        type: "error",
      })
    );
  }
}

function* handleCreateProduct(action: Action) {
  try {
    yield put(layoutActions.startLayoutLoading());
    const formdata: any = new FormData();
    action.payload.formData.forEach((file: File) =>
      formdata.append("files", file)
    );
    // console.log({ formdata });
    if (action.payload.formData.length) {
      const listImagesUrl: { data: any } = yield call(
        ProductApi.uploadImages,
        formdata
      );
      // console.log({ listImagesUrl });
      const response: { data: any } = yield call(ProductApi.createProduct, {
        ...action.payload.params,
        images: listImagesUrl.data.data,
      });
    } else {
      const response: { data: any } = yield call(ProductApi.createProduct, {
        ...action.payload.params,
        images: [],
      });
    }
    action.payload?.onNext();
    yield put(productActions.resetTemporarylistImgUrl());
    yield put(layoutActions.endLayoutLoading());
    yield put(
      alertActions.showAlert({
        text: "Tạo sản phẩm thành công",
        type: "success",
      })
    );
  } catch (error) {
    yield put(layoutActions.endLayoutLoading());
    yield put(productActions.createProductFailed());
    yield put(
      alertActions.showAlert({
        text: "Tạo sản phẩm thất bại",
        type: "error",
      })
    );
  }
}

function* handleUpdateProduct(action: Action) {
  try {
    yield put(layoutActions.startLayoutLoading());
    const listImgHadUrl = action.payload.listImageDetailHadUrl.map(
      (img: any) => ({
        src: img.preview,
      })
    );
    const formdata: any = new FormData();
    action.payload.formData.forEach((file: File) =>
      formdata.append("files", file)
    );
    // console.log({ formdata });
    if (action.payload.formData.length) {
      const listImagesUrl: { data: any } = yield call(
        ProductApi.uploadImages,
        formdata
      );
      // console.log({ listImagesUrl });
      const response: { data: any } = yield call(ProductApi.updateProduct, {
        id: action.payload.id,
        data: {
          ...action.payload.params,
          images: [...listImagesUrl.data.data, ...listImgHadUrl],
        },
      });
    } else {
      const response: { data: any } = yield call(ProductApi.updateProduct, {
        id: action.payload.id,
        data: { ...action.payload.params, images: [...listImgHadUrl] },
      });
    }
    action.payload?.onNext();
    yield put(productActions.resetTemporarylistImgUrl());
    yield put(productActions.resetListImageDetailHadUrl());
    yield put(productActions.getProductDetail(action.payload.id));
    yield put(layoutActions.endLayoutLoading());
    yield put(
      alertActions.showAlert({
        text: "Chỉnh sửa sản phẩm thành công",
        type: "success",
      })
    );
  } catch (error) {
    yield put(layoutActions.endLayoutLoading());
    yield put(productActions.createProductFailed());
    yield put(
      alertActions.showAlert({
        text: "Chỉnh sửa sản phẩm thất bại",
        type: "error",
      })
    );
  }
}

function* handleDeleteListImagesWillBeDelete(action: Action) {
  try {
    yield call(ProductApi.deleteImages, action.payload);
    yield put(productActions.resetListImageWillBeDeleteWhenCancel());
  } catch (error) {
    yield put(productActions.resetListImageWillBeDeleteWhenCancel());
    yield put(
      alertActions.showAlert({
        text: "Xóa ảnh thất bại",
        type: "error",
      })
    );
  }
}

function* handleDeleteProduct(action: Action) {
  try {
    yield put(layoutActions.startLayoutLoading());
    yield call(ProductApi.deleteProduct, action.payload);
    yield put(productActions.deleteProductSuccess());
    yield put(productActions.getListProducts({}));
    yield put(layoutActions.endLayoutLoading());

    yield put(
      alertActions.showAlert({
        text: "Xóa sản phẩm thành công",
        type: "success",
      })
    );
  } catch (error) {
    yield put(productActions.deleteProductFailed());
    yield put(layoutActions.endLayoutLoading());
    yield put(
      alertActions.showAlert({
        text: "Xóa sản phẩm thất bại",
        type: "error",
      })
    );
  }
}

function* watchProductFlow() {
  yield all([
    takeLatest(productActions.getListProducts.type, handleGetListProducts),
    takeLatest(productActions.getProductDetail.type, handleGetProductDetail),
    takeLatest(productActions.createProduct.type, handleCreateProduct),
    takeLatest(productActions.updateProduct.type, handleUpdateProduct),
    takeLatest(productActions.deleteProduct.type, handleDeleteProduct),
    takeLatest(productActions.getListCategory.type, handleGetListCategories),
    takeLatest(
      productActions.deleteListImageWillBeDeleteWhenCancel.type,
      handleDeleteListImagesWillBeDelete
    ),
  ]);
}

export function* productSaga() {
  yield fork(watchProductFlow);
}
