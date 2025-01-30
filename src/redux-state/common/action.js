import {
  ADD_TO_CART,
  ADD_PRODUCT_CATALOG,
  ADD_PRODUCT_CATALOG_SUCCESS,
  CHANGE_LANGUAGE,
  CREATE_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  EDIT_CATEGORY,
  EDIT_CATEGORY_SUCCESS,
  EDIT_PRODUCT,
  EDIT_PRODUCT_CATALOG,
  EDIT_PRODUCT_CATALOG_SUCCESS,
  EDIT_PRODUCT_SUCCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_PRODUCT_CATALOG,
  GET_PRODUCT_CATALOG_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS_BY_CATEGORY_SUCCESS,
  GET_PRODUCTS_SUCCESS,
  GET_SEARCHED_PRODUCTS,
  GET_SEARCHED_PRODUCTS_SUCCESS,
  PLACE_ORDER,
  PLACE_ORDER_SUCCESS,
  SET_LATEST_ORDER,
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  TOGGLE_TOAST,
  ADD_REMOVE_TO_WISHLIST,
  ADD_TO_WISHLIST_SUCCESS
} from './types';

export const addToCart = (cart) => (
  {
    type: ADD_TO_CART,
    payload: cart
  }
);

export const getProducts = (pagination, filter) => (
  {
    type: GET_PRODUCTS,
    payload: { pagination, filter }
  }
);

export const getProductsSuccess = (data) => (
  {
    type: GET_PRODUCTS_SUCCESS,
    payload: data
  }
);

export const getProductsByCategory = (pagination, category) => (
  {
    type: GET_PRODUCTS_BY_CATEGORY,
    payload: { pagination, category }
  }
);

export const getProductsByCategorySuccess = (data) => (
  {
    type: GET_PRODUCTS_BY_CATEGORY_SUCCESS,
    payload: data
  }
);

export const getCategories = (pagination, searchText) => (
  {
    type: GET_CATEGORIES,
    payload: { pagination, searchText }
  }
);

export const getCategoriesSuccess = (data) => (
  {
    type: GET_CATEGORIES_SUCCESS,
    payload: data
  }
);

export const getSearchedProducts = (searchText) => (
  {
    type: GET_SEARCHED_PRODUCTS,
    payload: searchText
  }
);

export const getSearchedProductsSuccess = (data) => (
  {
    type: GET_SEARCHED_PRODUCTS_SUCCESS,
    payload: data
  }
);

export const editProduct = (id, data, pagination) => (
  {
    type: EDIT_PRODUCT,
    payload: { id, data, pagination }
  }
);

export const editProductSuccess = () => (
  {
    type: EDIT_PRODUCT_SUCCESS
  }
);

export const createCategory = (data) => (
  {
    type: CREATE_CATEGORY,
    payload: data
  }
);

export const createCategorySuccess = () => (
  {
    type: CREATE_CATEGORY_SUCCESS
  }
);

export const editCategory = (data) => (
  {
    type: EDIT_CATEGORY,
    payload: data
  }
);

export const editCategorySuccess = () => (
  {
    type: EDIT_CATEGORY_SUCCESS
  }
);

export const addProductCatalog = (data) => (
  {
    type: ADD_PRODUCT_CATALOG,
    payload: data
  }
);

export const addProductCatalogSuccess = () => (
  {
    type: ADD_PRODUCT_CATALOG_SUCCESS
  }
);

export const getProductCatalog = () => (
  {
    type: GET_PRODUCT_CATALOG,
  }
);

export const getProductCatalogSuccess = data => (
  {
    type: GET_PRODUCT_CATALOG_SUCCESS,
    payload: data
  }
);

export const editProductCatalog = (data) => (
  {
    type: EDIT_PRODUCT_CATALOG,
    payload: data
  }
);

export const editProductCatalogSuccess = () => (
  {
    type: EDIT_PRODUCT_CATALOG_SUCCESS,
  }
);

export const changeLanguage = (lang) => (
  {
    type: CHANGE_LANGUAGE,
    payload: lang
  }
);

export const placeOrder = (user, cart) => (
  {
    type: PLACE_ORDER,
    payload: { user, cart },
  }
);

export const placeOrderSuccess = payload => (
  {
    type: PLACE_ORDER_SUCCESS,
    payload: payload,
  }
);

export const addRemoveToWishlist = (data) => (
  {
    type: ADD_REMOVE_TO_WISHLIST,
    payload: data,
  }
);

export const addRemoveToWishlistSuccess = payload => (
  {
    type: ADD_TO_WISHLIST_SUCCESS,
    payload: payload,
  }
);

export const setLatestOrders = (latestOrder) => (
  {
    type: SET_LATEST_ORDER,
    payload: latestOrder,
  }
);

export const getOrders = () => (
  {
    type: GET_ORDERS
  }
);

export const getOrdersSuccess = payload => (
  {
    type: GET_ORDERS_SUCCESS,
    payload: payload,
  }
);

export const toggleToast = (isOpen, message, toastType) => (
  {
    type: TOGGLE_TOAST,
    payload: { isOpen, message, toastType },
  }
);
