import { call, put, select, takeLatest } from 'redux-saga/effects'
import * as Actions from './action';
import { Api } from './api'
import {
  EDIT_PRODUCT,
  GET_PRODUCTS,
  GET_SEARCHED_PRODUCTS,
} from './types'

const getToken = state => state.onboarding.token;

function* getProducts(action) {
  try {
    const data = yield call(Api.getProducts, action.payload);
    yield put(Actions.getProductsSuccess(data));
  } catch (error) {
    yield put(Actions.getProductsSuccess([]));
    console.log("error", error);
  }
}

function* getSearchedProducts(action) {
  try {
    const data = yield call(Api.getSearchedProducts, action.payload);
    yield put(Actions.getSearchedProductsSuccess([data]));
  } catch (error) {
    yield put(Actions.getSearchedProductsSuccess([]));
    console.log("error", error);
  }
}

function* editProduct(action) {
  const token = yield select(getToken);
  try {
    const { pagination } = action.payload
    yield call(Api.editProducts, action.payload, token);
    yield put(Actions.editProductSuccess());
    yield put(Actions.getProducts(pagination));
  } catch (error) {
    yield put(Actions.editProductSuccess());
    console.log("error", error);
  }
}

function* commonSaga() {
  yield takeLatest(GET_SEARCHED_PRODUCTS, getSearchedProducts);
  yield takeLatest(GET_PRODUCTS, getProducts);
  yield takeLatest(EDIT_PRODUCT, editProduct);
}

export default commonSaga;
