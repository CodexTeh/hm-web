import {
  EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS
} from './types';

export const getProducts = (pagination) => (
  {
    type: GET_PRODUCTS,
    payload: pagination
  }
);

export const getProductsSuccess = (data) => (
  {
    type: GET_PRODUCTS_SUCCESS,
    payload: data
  }
);

export const editProduct = (id, data) => (
  {
    type: EDIT_PRODUCT,
    payload: { id, data }
  }
);

export const editProductSuccess = (data) => (
  {
    type: EDIT_PRODUCT_SUCCESS,
    payload: data
  }
);
