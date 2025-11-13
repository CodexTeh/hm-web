import { call, put, select, takeLatest } from 'redux-saga/effects'
import * as Actions from './action';
import { Api } from './api'
import {
  ADD_PRODUCT_CATALOG,
  ADD_REMOVE_TO_WISHLIST,
  CREATE_CATEGORY,
  EDIT_CATEGORY,
  EDIT_PRODUCT,
  EDIT_PRODUCT_CATALOG,
  GET_BANNERS,
  GET_CATEGORIES,
  GET_ORDERS,
  GET_PRODUCT_CATALOG,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
  GET_SEARCHED_PRODUCTS,
  PLACE_ORDER,
  GET_USER_PROFILE,
  GET_SALE_TIMER,
} from './types'

const getToken = state => state.onboarding.token;
const getLanguage = state => state.common.language;
const getUser = state => state.onboarding.user;

function* getProducts(action) {
  try {
    const { loadFromButton } = action.payload;
    const data = yield call(Api.getProducts, action.payload);
    yield put(Actions.getProductsSuccess(data, loadFromButton));
  } catch (error) {
    yield put(Actions.getProductsSuccess([]));
    console.log("error", error);
  }
}

function* getOrders(action) {
  try {
    const user = yield select(getUser);
    const data = yield call(Api.getOrders, user._id);
    yield put(Actions.getOrdersSuccess(data));
  } catch (error) {
    yield put(Actions.getOrdersSuccess([]));
    console.log("error", error);
  }
}

function* getProfile(action) {
  try {
    const token = yield select(getToken);

    const data = yield call(Api.getProfile, action.payload, token);
    yield put(Actions.getProfileSuccess(data));
  } catch (error) {
    yield put(Actions.getProfileSuccess([]));
    console.log("error", error);
  }
}

function* getProductsByCategory(action) {
  try {
    const data = yield call(Api.getProductsByCategory, action.payload);
    yield put(Actions.getProductsByCategorySuccess(data));
  } catch (error) {
    yield put(Actions.getProductsByCategorySuccess([]));
    console.log("error", error);
  }
}

function* getSearchedProducts(action) {
  try {
    const data = yield call(Api.getSearchedProducts, action.payload);
    if (data?.status === true) {
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
    if (data) {
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
    if (data) {
      yield put(Actions.getProductCatalogSuccess(data));
    } else {
      yield put(Actions.getProductCatalogSuccess([]));
    }
  } catch (error) {
    yield put(Actions.getProductCatalogSuccess([]));
    console.log("error", error);
  }
}

function* getBanners(action) {
  try {
    const data = yield call(Api.getBanners, action.payload);
    if (data) {
      yield put(Actions.getBannersSuccess(data));
    } else {
      yield put(Actions.getBannersSuccess([]));
    }
  } catch (error) {
    yield put(Actions.getBannersSuccess([]));
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

function* placeOrder(action) {
  const token = yield select(getToken);
  const language = yield select(getLanguage);

  try {
    yield call(Api.placeOrder, action.payload, token, language);
    // yield put(
    //   Actions.toggleToast(true, language === 'en' ? 'Order Placed successfully!' : 'تم تقديم الطلب بنجاح!', 'success')
    // );
    yield put(Actions.placeOrderSuccess());
  } catch (error) {
    yield put(Actions.placeOrderSuccess());
    console.log('error', error);
  }
}

function* addRemoveToWishlist(action) {
  const token = yield select(getToken);
  const language = yield select(getLanguage);

  try {
    yield call(Api.addRemoveToWishlist, action.payload, token, language);
    yield put(Actions.addRemoveToWishlistSuccess());
  } catch (error) {
    const { status } = JSON.parse(error.message);
    if (status === 409) {
      alert("You can not add more than 500 products in wishlist");
    }

    yield put(Actions.addRemoveToWishlistSuccess());
  }
}

function* getSaleTimers(action) {
  try {
    const data = yield call(Api.getSaleTimers, action.payload);
    if (data) {
      yield put(Actions.getSaleTimersSuccess(data));
    } else {
      yield put(Actions.getSaleTimersSuccess([]));
    }
  } catch (error) {
    yield put(Actions.getSaleTimersSuccess([]));
    console.log("error", error);
  }
}

function* commonSaga() {
  yield takeLatest(GET_SEARCHED_PRODUCTS, getSearchedProducts);
  yield takeLatest(GET_PRODUCTS, getProducts);
  yield takeLatest(GET_ORDERS, getOrders);
  yield takeLatest(GET_PRODUCTS_BY_CATEGORY, getProductsByCategory);
  yield takeLatest(GET_CATEGORIES, getCategories);
  yield takeLatest(GET_PRODUCT_CATALOG, getProductCatalog);
  yield takeLatest(EDIT_PRODUCT, editProduct);
  yield takeLatest(GET_BANNERS, getBanners);
  yield takeLatest(CREATE_CATEGORY, createCategory);
  yield takeLatest(ADD_PRODUCT_CATALOG, addProductCatalog);
  yield takeLatest(EDIT_PRODUCT_CATALOG, editProductCatalog);
  yield takeLatest(EDIT_CATEGORY, editCategory);
  yield takeLatest(PLACE_ORDER, placeOrder);
  yield takeLatest(ADD_REMOVE_TO_WISHLIST, addRemoveToWishlist);
  yield takeLatest(GET_USER_PROFILE, getProfile);
  yield takeLatest(GET_SALE_TIMER, getSaleTimers);

}

export default commonSaga;
