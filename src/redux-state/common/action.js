import {
  ADD_PRODUCT_CATALOG,
  ADD_PRODUCT_CATALOG_SUCCESS,
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
