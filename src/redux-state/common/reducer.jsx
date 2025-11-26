/* eslint-disable import/no-anonymous-default-export */
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
  GET_SALE_TIMER,
  GET_SALE_TIMER_SUCCESS,
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  SET_LATEST_ORDER,
  TOGGLE_TOAST,
  ADD_REMOVE_TO_WISHLIST,
  ADD_TO_WISHLIST_SUCCESS,
  OPEN_LOGIN_MODAL,
  OPEN_REGISTER_MODAL,
  GET_BANNERS,
  GET_BANNERS_SUCCESS,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  EMPTY_CART,
  SET_SEARCH_TEXT,
} from "./types";

const INITIAL_STATE = {
  productsLoading: false,
  productsByCategoryLoading: false,
  editProductLoading: false,
  products: [],
  offerProducts: [],
  newArrivalProducts: [],
  flashSaleProducts: [],
  wishlistProducts: [],
  subcatProducts: [],
  toggleToast: false,
  toastType: "",
  toastMessage: "",
  loginModal: false,
  registerModal: false,
  profile: null,
  getProfileLoading: false,
  searchText: null,
  cart: {
    items: [],
    user: {},
    totalPrice: 0,
    orderDetails: {},
  },
  orders: [],
  getOrdersLoading: false,
  latestOrderId: null,
  productsByCategory: [],
  totalProductsByCategory: 0,
  totalProducts: 0,
  categories: [],
  subCategories: [],
  getBannersLoading: false,
  banners: [],
  getCategoriesLoading: false,
  createCategoryLoading: false,
  editCategoryLoading: false,
  getSaleTimerLoading: false,
  saleTimers: [],
  editProductCatalogLoading: false,
  productCatalogs: [],
  addProductCatalogLodaing: false,
  placeOrderLoading: false,
  wishlistLoading: false,
  wishList: [],
  language: "en",
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_LANGUAGE:
      return { ...state, language: payload };

    case GET_SALE_TIMER:
      return { ...state, getSaleTimerLoading: true };
    case GET_SALE_TIMER_SUCCESS:
      return { ...state, saleTimers: payload, getSaleTimerLoading: false };

    case EMPTY_CART:
      return {
        ...state,
        cart: {
          items: [],
          user: {},
          totalPrice: 0,
          orderDetails: {},
        },
      };

    case TOGGLE_TOAST:
      return {
        ...state,
        toggleToast: payload.isOpen,
        toastMessage: payload.message,
        toastType: payload.type,
      };

    case ADD_TO_CART:
      return { ...state, cart: payload };

    case OPEN_LOGIN_MODAL:
      return { ...state, loginModal: payload };
    case OPEN_REGISTER_MODAL:
      return { ...state, registerModal: payload };

    case PLACE_ORDER:
      return { ...state, placeOrderLoading: true };

    case PLACE_ORDER_SUCCESS:
      return { ...state, placeOrderLoading: false };

    case GET_USER_PROFILE:
      return { ...state, getProfileLoading: true };

    case GET_USER_PROFILE_SUCCESS:
      return { ...state, getProfileLoading: false, profile: payload };

    case ADD_REMOVE_TO_WISHLIST:
      return { ...state, wishlistLoading: true };

    case ADD_TO_WISHLIST_SUCCESS:
      return { ...state, wishlistLoading: false, wishList: payload };

    case GET_PRODUCTS:
      return { ...state, productsLoading: true };

    case GET_PRODUCTS_SUCCESS: {
      const pathname = window.location.pathname;

      const { data, loadFromButton } = payload;
      let key = "products";
      if (pathname === "/offers") key = "offerProducts";
      else if (pathname === "/new-arrivals") key = "newArrivalProducts";
      else if (pathname === "/flashSale") key = "flashSaleProducts";
      else if (pathname === "/wishlist") key = "wishlistProducts";
      else if (pathname.includes("product")) key = "subcatProducts";
      if (!loadFromButton) {
        return {
          ...state,
          productsLoading: false,
          [key]: data?.products?.filter(
            (item) =>
              item.image_urls &&
              item?.image_urls?.trim() !== "[]" &&
              item.qty_onhand > 0
          ),
          totalProducts: data?.count,
        };
      } else {
        const filteredProducts =
          data?.products?.filter(
            (item) =>
              item.image_urls &&
              item?.image_urls?.trim() !== "[]" &&
              item.qty_onhand > 0
          ) || [];

        // If it's page 1 (first load), replace the list; otherwise, append
        const isFirstPage = data?.page === 0 || !state?.[key]?.length;
        const mergedProducts = [...state?.[key], ...filteredProducts];
        const uniqueProducts = mergedProducts.filter(
          (p, index, self) => index === self.findIndex((x) => x.id === p.id)
        );
        return {
          ...state,
          productsLoading: false,
          [key]: isFirstPage ? filteredProducts : uniqueProducts,
          totalProducts: data?.count,
        };
      }
    }

    case GET_PRODUCTS_BY_CATEGORY:
      return { ...state, productsByCategoryLoading: true };

    case GET_PRODUCTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        productsByCategoryLoading: false,
        productsByCategory: action.payload.products,
        totalProductsByCategory: action.payload?.products?.length,
      };

    case GET_BANNERS:
      return { ...state, getBannersLoading: true };
    case GET_BANNERS_SUCCESS:
      return { ...state, banners: payload, getBannersLoading: false };
    case GET_CATEGORIES:
      return { ...state, getCategoriesLoading: true };

    case GET_CATEGORIES_SUCCESS:
      const { category, subcategory } = payload;
      return {
        ...state,
        getCategoriesLoading: false,
        categories: category,
        subCategories: subcategory,
      };

    case GET_SEARCHED_PRODUCTS:
      return { ...state, productsLoading: true };

    case GET_SEARCHED_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsLoading: false,
        products: action.payload,
        totalProducts: 1,
      };

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
      return {
        ...state,
        addProductCatalogLodaing: false,
        productCatalogs: action.payload,
      };

    case GET_ORDERS:
      return { ...state, getOrdersLoading: true };

    case GET_ORDERS_SUCCESS:
      return { ...state, getOrdersLoading: false, orders: action.payload.data };

    case SET_LATEST_ORDER:
      return { ...state, latestOrderId: action.payload };

    case EDIT_CATEGORY:
      return { ...state, editCategoryLoading: true };

    case SET_SEARCH_TEXT:
      return { ...state, searchText: action.payload };

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
