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
export const GetSubCategories = () =>
  useSelector(
    (state) => state.common.subCategories);
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
export const GetCartDetails = () =>
  useSelector(
    (state) => state.common.cart);
export const GetPlaceOrderLoading = () =>
  useSelector(
    (state) => state.common.placeOrderLoading);
export const GetLatestOrder = () =>
  useSelector(
    (state) => state.common.latestOrderId);
export const GetOrders = () =>
  useSelector(
    (state) => state.common.orders);
export const GetOrdersLoading = () =>
  useSelector(
    (state) => state.common.getOrdersLoading);
export const GetToggleToast = () =>
  useSelector(
    (state) => state.common.toggleToast);
export const GetToastMessage = () =>
  useSelector(
    (state) => state.common.toastMessage);
export const GetToastType = () =>
  useSelector(
    (state) => state.common.toastType);
export const GetWishlistLoading = () =>
  useSelector(
    (state) => state.common.wishlistLoading);
export const GetloginModalState = () =>
  useSelector(
    (state) => state.common.loginModal);
export const GetBanners = () =>
  useSelector(
    (state) => state.common.banners);