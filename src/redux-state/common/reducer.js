import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  GET_SEARCHED_PRODUCTS,
  GET_SEARCHED_PRODUCTS_SUCCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  CREATE_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
} from './types';

const INITIAL_STATE = {
  productsLoading: false,
  editProductLoading: false,
  products: [],
  totalProducts: 0,
  categories: [],
  getCategoriesLoading: false,
  createCategoryLoading: false,

};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {

    case GET_PRODUCTS:
      return { ...state, productsLoading: true };

    case GET_PRODUCTS_SUCCESS:
      return { ...state, productsLoading: false, products: action.payload.products, totalProducts: action.payload.count };

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

    default:
      return state;
  }
};
