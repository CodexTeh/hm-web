import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS_BY_CATEGORY_SUCCESS,
  EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  GET_SEARCHED_PRODUCTS,
  GET_SEARCHED_PRODUCTS_SUCCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  CREATE_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  EDIT_CATEGORY,
  EDIT_CATEGORY_SUCCESS,
  ADD_PRODUCT_CATALOG,
  ADD_PRODUCT_CATALOG_SUCCESS,
  GET_PRODUCT_CATALOG,
  GET_PRODUCT_CATALOG_SUCCESS,
  EDIT_PRODUCT_CATALOG,
  EDIT_PRODUCT_CATALOG_SUCCESS,
  CHANGE_LANGUAGE,
  ADD_TO_CART,
  PLACE_ORDER,
  PLACE_ORDER_SUCCESS,
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  SET_LATEST_ORDER,
  TOGGLE_TOAST
} from './types';

const INITIAL_STATE = {
  productsLoading: false,
  productsByCategoryLoading: false,
  editProductLoading: false,
  products: [],
  toggleToast: false,
  toastType: '',
  toastMessage: '',
  cart: {
    items: [],
    user: {},
    totalPrice: 0,
    orderDetails: {}
  },
  orders: [],
  getOrdersLoading: false,
  latestOrderId: null,
  productsByCategory: [],
  totalProductsByCategory: 0,
  totalProducts: 0,
  categories: [],
  getCategoriesLoading: false,
  createCategoryLoading: false,
  editCategoryLoading: false,
  editProductCatalogLoading: false,
  productCatalogs: [],
  addProductCatalogLodaing: false,
  placeOrderLoading: false,
  language: 'en'
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {

    case CHANGE_LANGUAGE:
      return { ...state, language: payload };

    case TOGGLE_TOAST:
      return { ...state, toggleToast: payload.isOpen, toastMessage: payload.message, toastType: payload.type };

    case ADD_TO_CART:
      return { ...state, cart: payload };

    case PLACE_ORDER:
      return { ...state, placeOrderLoading: true };

    case PLACE_ORDER_SUCCESS:
      return { ...state, placeOrderLoading: false };

    case GET_PRODUCTS:
      return { ...state, productsLoading: true };

    case GET_PRODUCTS_SUCCESS:
      return { ...state, productsLoading: false, products: action.payload.products, totalProducts: action.payload.count };

    case GET_PRODUCTS_BY_CATEGORY:
      return { ...state, productsByCategoryLoading: true };

    case GET_PRODUCTS_BY_CATEGORY_SUCCESS:
      return { ...state, productsByCategoryLoading: false, productsByCategory: action.payload.products, totalProductsByCategory: action.payload?.products?.length };

    case GET_CATEGORIES:
      return { ...state, getCategoriesLoading: true };

    case GET_CATEGORIES_SUCCESS:
      return { ...state, getCategoriesLoading: false, categories: action.payload.data };

    case GET_SEARCHED_PRODUCTS:
      return { ...state, productsLoading: true };

    case GET_SEARCHED_PRODUCTS_SUCCESS:
      return { ...state, productsLoading: false, products: action.payload, totalProducts: 1 };

    case EDIT_PRODUCT:
      return { ...state, editProductLoading: true };

    case EDIT_PRODUCT_SUCCESS:
      return { ...state, editProductLoading: false };

    case CREATE_CATEGORY:
      return { ...state, createCategoryLoading: true };

    case CREATE_CATEGORY_SUCCESS:
      return { ...state, createCategoryLoading: false };

    case ADD_PRODUCT_CATALOG:
      return { ...state, addProductCatalogLodaing: true };

    case ADD_PRODUCT_CATALOG_SUCCESS:
      return { ...state, addProductCatalogLodaing: false };

    case GET_PRODUCT_CATALOG:
      return { ...state, addProductCatalogLodaing: true };

    case GET_PRODUCT_CATALOG_SUCCESS:
      return { ...state, addProductCatalogLodaing: false, productCatalogs: action.payload };

    case GET_ORDERS:
      return { ...state, getOrdersLoading: true };

    case GET_ORDERS_SUCCESS:
      return { ...state, getOrdersLoading: false, orders: action.payload.data };

    case SET_LATEST_ORDER:
      return { ...state, latestOrderId: action.payload };

    case EDIT_CATEGORY:
      return { ...state, editCategoryLoading: true };

    case EDIT_CATEGORY_SUCCESS:
      return { ...state, editCategoryLoading: false };

    case EDIT_PRODUCT_CATALOG:
      return { ...state, editProductCatalogLoading: true };

    case EDIT_PRODUCT_CATALOG_SUCCESS:
      return { ...state, editProductCatalogLoading: false };

    default:
      return state;
  }
};
