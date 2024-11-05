import { call, put, select, takeLatest } from 'redux-saga/effects'
import * as Actions from './action';
import { Api } from './api'
import {
  ADD_PRODUCT_CATALOG,
  CREATE_CATEGORY,
  EDIT_CATEGORY,
  EDIT_PRODUCT,
  EDIT_PRODUCT_CATALOG,
  GET_CATEGORIES,
  GET_PRODUCT_CATALOG,
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
    if (data?.status == true) {
      yield put(Actions.getSearchedProductsSuccess([data]));
    } else {
      yield put(Actions.getSearchedProductsSuccess([]));
    }
  } catch (error) {
    yield put(Actions.getSearchedProductsSuccess([]));
    console.log("error", error);
  }
}

function* getCategories(action) {
  try {
    const data = yield call(Api.getCategories, action.payload);
    if (data?.data) {
      yield put(Actions.getCategoriesSuccess(data));
    } else {
      yield put(Actions.getCategoriesSuccess([]));
    }
  } catch (error) {
    yield put(Actions.getSearchedProductsSuccess([]));
    console.log("error", error);
  }
}

function* getProductCatalog(action) {
  try {
    const data = yield call(Api.getProductCatalog, action.payload);
    if (data?.data) {
      yield put(Actions.getProductCatalogSuccess(data.data));
    } else {
      yield put(Actions.getProductCatalogSuccess([]));
    }
  } catch (error) {
    yield put(Actions.getProductCatalogSuccess([]));
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

function* createCategory(action) {
  const token = yield select(getToken);
  try {
    yield call(Api.createCategory, action.payload, token);
    yield put(Actions.getCategories());
    yield put(Actions.createCategorySuccess());
  } catch (error) {
    yield put(Actions.createCategorySuccess());
    console.log("error", error);
  }
}

function* addProductCatalog(action) {
  const token = yield select(getToken);
  try {
    yield call(Api.addProductCatalog, action.payload, token);
    yield put(Actions.getProductCatalog());
    yield put(Actions.addProductCatalogSuccess());
  } catch (error) {
    yield put(Actions.addProductCatalogSuccess());
    console.log("error", error);
  }
}

function* editProductCatalog(action) {
  const token = yield select(getToken);
  try {
    yield call(Api.editProductCatalog, action.payload, token);
    yield put(Actions.getProductCatalog());
    yield put(Actions.editProductCatalogSuccess());
  } catch (error) {
    yield put(Actions.editProductCatalogSuccess());
    console.log("error", error);
  }
}

function* editCategory(action) {
  const token = yield select(getToken);
  try {
    yield call(Api.editCategory, action.payload, token);
    yield put(Actions.getCategories());
    yield put(Actions.editCategorySuccess());
  } catch (error) {
    yield put(Actions.editCategorySuccess());
    console.log("error", error);
  }
}

function* commonSaga() {
  yield takeLatest(GET_SEARCHED_PRODUCTS, getSearchedProducts);
  yield takeLatest(GET_PRODUCTS, getProducts);
  yield takeLatest(GET_CATEGORIES, getCategories);
  yield takeLatest(GET_PRODUCT_CATALOG, getProductCatalog);
  yield takeLatest(EDIT_PRODUCT, editProduct);
  yield takeLatest(CREATE_CATEGORY, createCategory);
  yield takeLatest(ADD_PRODUCT_CATALOG, addProductCatalog);
  yield takeLatest(EDIT_PRODUCT_CATALOG, editProductCatalog);
  yield takeLatest(EDIT_CATEGORY, editCategory);
}

export default commonSaga;
