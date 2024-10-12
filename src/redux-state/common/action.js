import {
  EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_SEARCHED_PRODUCTS,
  GET_SEARCHED_PRODUCTS_SUCCESS
} from './types';

export const getProducts = (pagination, searchText) => (
  {
    type: GET_PRODUCTS,
    payload: { pagination, searchText }
  }
);

export const getProductsSuccess = (data) => (
  {
    type: GET_PRODUCTS_SUCCESS,
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
