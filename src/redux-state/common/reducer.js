import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
} from './types';

const INITIAL_STATE = {
  productsLoading: false,
  editProductLoading: false,
  products: [],
  totalProducts: 0

};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {

    case GET_PRODUCTS:
      return { ...state, productsLoading: true };

    case GET_PRODUCTS_SUCCESS:
      return { ...state, productsLoading: false, products: action.payload.data, totalProducts: action.payload.total };

    case EDIT_PRODUCT:
      return { ...state, editProductLoading: true };

    case EDIT_PRODUCT_SUCCESS:
      return { ...state, editProductLoading: false };

    default:
      return state;
  }
};
