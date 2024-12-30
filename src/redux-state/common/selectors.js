import { useSelector } from 'react-redux';

export const GetProductsLoading = () =>
  useSelector(
    (state) => state.common.productsLoading);
export const GetProducts = () =>
  useSelector(
    (state) => state.common.products);
export const GetAllProductsCount = () =>
  useSelector(
    (state) => state.common.totalProductsByCategory);
export const GetProductsByCategoryLoading = () =>
  useSelector(
    (state) => state.common.productsByCategoryLoading);
export const GetProductsByCategory = () =>
  useSelector(
    (state) => state.common.productsByCategory);
export const GetAllProductsByCategoryCount = () =>
  useSelector(
    (state) => state.common.totalProducts);
export const GetEditProductLoading = () =>
  useSelector(
    (state) => state.common.editProductLoading);
export const GetCategoriesLoading = () =>
  useSelector(
    (state) => state.common.getCategoriesLoading);
export const GetCategories = () =>
  useSelector(
    (state) => state.common.categories);
export const GetCreateCategoryLoading = () =>
  useSelector(
    (state) => state.common.createCategoryLoading);
export const GetEditCategoryLoading = () =>
  useSelector(
    (state) => state.common.editCategoryLoading);
export const GetProductCatalogs = () =>
  useSelector(
    (state) => state.common.productCatalogs);
export const AddProductCatalogLoading = () =>
  useSelector(
    (state) => state.common.addProductCatalogLodaing);
export const EditProductCatalogLoading = () =>
  useSelector(
    (state) => state.common.editProductCatalogLoading);
export const GetLanguage = () =>
  useSelector(
    (state) => state.common.language);
