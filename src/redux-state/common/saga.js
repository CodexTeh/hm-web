import { call, put, select, takeLatest } from 'redux-saga/effects'
import { editProductSuccess, getProductsSuccess } from './action';
import { Api } from './api'
import {
  EDIT_PRODUCT,
  GET_PRODUCTS,
} from './types'

function* getProducts(action) {
  try {
    const data = yield call(Api.getProducts, action.payload);
    yield put(getProductsSuccess(data));
  } catch (error) {
    yield put(getProductsSuccess([]));
    console.log("error", error);
  }
}

function* editProduct(action) {
  try {
    const data = yield call(Api.editProducts, action.payload);
    yield put(editProductSuccess(data));
    yield put(getProducts(data));
  } catch (error) {
    yield put(editProductSuccess());
    console.log("error", error);
  }
}

function* commonSaga() {
  yield takeLatest(GET_PRODUCTS, getProducts);
  yield takeLatest(EDIT_PRODUCT, editProduct);
}

export default commonSaga;
