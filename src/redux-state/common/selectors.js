import { useSelector } from 'react-redux';

export const GetProductsLoading = () =>
  useSelector(
    (state) => state.common.productsLoading);
export const GetProducts = () =>
  useSelector(
    (state) => state.common.products);
export const GetAllProductsCount = () =>
  useSelector(
    (state) => state.common.totalProducts);
export const GetEditProductLoading = () =>
  useSelector(
    (state) => state.common.editProductLoading);