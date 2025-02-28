import queryString from 'query-string';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL;
const SERVER_URL = process.env.REACT_APP_ODO_API_URL;

export const Api = {
  getProducts: async ({ pagination, filter = null }) => {
    try {
      let response;
      const options = {
        method: 'GET',
      };

      const { page = 1, perPage = 10 } = pagination || {};
      const query = {
        page: JSON.stringify(page + 1),
        limit: JSON.stringify(perPage),
        ...filter
      };

      response = await fetch(`${SERVER_URL}/get_products?${queryString.stringify(query)}`, options);

      switch (response.status) {
        case 200:
          const data = await response.json();
          return data;
        case 400:
          throw new Error('All fields are required');
        case 409:
          throw new Error('User already exists!');
        default:
          throw new Error('Something went wrong!');

      }
    } catch (e) {
      console.log("Error", e);
    }
  },
  getWishListProducts: async (userId) => {
    try {
      let response;

      const options = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      };

      response = await fetch(`${API_URL}wishlist?userId=${userId}`, options);

      switch (response.status) {
        case 200:
          const data = await response.json();
          return data;
        case 400:
          throw new Error('All fields are required');
        case 409:
          throw new Error('User already exists!');
        default:
          throw new Error('Something went wrong!');

      }
    } catch (e) {
      console.log("Error", e);
    }
  },

  getOrders: async (userId) => {
    try {
      let response;

      const options = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      };

      const { page = 1, perPage = 10 } = {};
      let rangeStart, rangeEnd;
      rangeStart = (page) * (perPage);
      rangeEnd = ((page) + 1) * (perPage) - 1;
      const query = {
        sort: JSON.stringify(['createdAt', 'ASC']),
        range: JSON.stringify([rangeStart, rangeEnd]),
        filter: JSON.stringify({ '$custom': { 'userId': userId, 'status': 'all' } }),
      };

      response = await fetch(`${API_URL}orders?${queryString.stringify(query)}`, options);

      switch (response.status) {
        case 200:
          const data = await response.json();
          return data;
        case 400:
          throw new Error('All fields are required');
        case 409:
          throw new Error('User already exists!');
        default:
          throw new Error('Something went wrong!');

      }
    } catch (e) {
      console.log("Error", e);
    }
  },
  getProductsByCategory: async ({ pagination, category }) => {
    try {
      let response;
      const options = {
        method: 'GET',
      };

      const { page = 1, perPage = 10 } = pagination || {};
      const query = {
        page: JSON.stringify(page + 1),
        limit: JSON.stringify(perPage)
      };

      response = await fetch(`${SERVER_URL}/get_products_for_categories?category=['${category}']`, options);

      switch (response.status) {
        case 200:
          const data = await response.json();
          return data;
        case 400:
          throw new Error('All fields are required');
        case 409:
          throw new Error('User already exists!');
        default:
          throw new Error('Something went wrong!');

      }
    } catch (e) {
      console.log("Error", e);
    }
  },
  getSearchedProducts: async (searchText) => {
    try {
      let response;
      const options = {
        method: 'GET',
      };

      response = await fetch(`${SERVER_URL}/get_specific_product?barcode=${searchText}`, options);

      switch (response.status) {
        case 200:
          const data = await response.json();
          return data;
        case 400:
          throw new Error('All fields are required');
        case 409:
          throw new Error('User already exists!');
        default:
          throw new Error('Something went wrong!');

      }
    } catch (e) {
      console.log("Error", e);
    }
  },
  getCategories: async () => {
    try {
      let response;
      let subCatResponse;
      const options = {
        method: 'GET',
      };

      response = await fetch(`${SERVER_URL}/api/get/all/category`, options);
      subCatResponse = await fetch(`${SERVER_URL}/api/get/all/subcategory`, options);

      switch (response.status) {
        case 200:
          const { category } = await response.json();
          const { subcategory } = await subCatResponse.json();
          return { category, subcategory };
        case 400:
          throw new Error('All fields are required');
        case 409:
          throw new Error('User already exists!');
        default:
          throw new Error('Something went wrong!');

      }
    } catch (e) {
      console.log("Error", e);
    }
  },
  createCategory: async (data, token) => {
    try {

      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(`${API_URL}categories`, options);

      switch (response.status) {
        case 200:
          toast("Category Added Successfully")
          const responseData = await response.json();
          return responseData;

        case 400:
          throw new Error('All fields are required');
        case 409:
          toast('Category or Subcategory already exists!')
          throw new Error('Category or Subcategory already exists!');
        default:
          throw new Error('Something went wrong!');
      }
    } catch (e) {
      console.log("Error", e);
    }
  },
  addProductCatalog: async (data, token) => {
    try {

      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(`${API_URL}product-catalogs`, options);

      switch (response.status) {
        case 200:
          toast("Product Catalog Added Successfully")
          const responseData = await response.json();
          return responseData;

        case 400:
          throw new Error('All fields are required');
        case 409:
          toast('Product Catalog already exists!')
          throw new Error('Product Catalog already exists!');
        default:
          throw new Error('Something went wrong!');
      }
    } catch (e) {
      console.log("Error", e);
    }
  },
  editProductCatalog: async (data, token) => {
    try {

      const options = {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(`${API_URL}update-product-catalogs`, options);

      switch (response.status) {
        case 200:
          toast("Product Catalog Updated Successfully")
          const responseData = await response.json();
          return responseData;

        case 400:
          throw new Error('All fields are required');
        default:
          throw new Error('Something went wrong!');
      }
    } catch (e) {
      console.log("Error", e);
    }
  },
  getProductCatalog: async () => {
    try {

      const options = {
        method: 'GET',
      };

      const response = await fetch(`${SERVER_URL}/api/get/all/catalog`, options);

      switch (response.status) {
        case 200:
          const { catalogs } = await response.json();
          return catalogs;

        case 400:
          throw new Error('All fields are required');
        default:
          throw new Error('Something went wrong!');
      }
    } catch (e) {
      console.log("Error", e);
    }
  },
  editCategory: async (data, token) => {
    try {

      const options = {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(`${API_URL}update-categories`, options);

      switch (response.status) {
        case 200:
          toast("Category Edited Successfully")
          return true;

        case 400:
          throw new Error('All fields are required');
        case 409:
          toast('Category or Subcategory already exists!')
          throw new Error('Category or Subcategory already exists!');
        default:
          throw new Error('Something went wrong!');
      }
    } catch (e) {
      console.log("Error", e);
    }
  },
  editProducts: async ({ id, data }, token) => {
    try {
      const { category, arabicCategory, subCategory, arabicSubCategory,
        name, arabicName, description, arabicDescription, brand,
        arabicBrand, material, arabicMaterial, size
        , arabicSize, unit, arabicUnit, availableColor
        , arabicAvailableColor, flashSale, arabicFlashSale, images } = data;

      let response;
      const formData = new FormData();

      const exisitingImages = [];

      for (let i = 0; i < images.length; i++) {
        if (images[i]?.file) {
          formData.append('file', images[i].file, images[i].title);
        } else if (images[i]?.url) {
          exisitingImages.push(images[i].url);
        }
      }
      if (exisitingImages.length > 0) {
        formData.append('existingImages', exisitingImages)
      }
      const options = {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      response = await fetch(`${API_URL}products/${id}`, options);

      switch (response.status) {
        case 200:
          toast("Product Edited Successfully")
          const imageUrls = await response.json();

          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              jsonrpc: "2.0",
              params: {
                id: id,
                image_urls: imageUrls,
                name: name,
                arabicName,
                description,
                arabicDescription,
                category_id: category._id,
                arabicCategory: arabicCategory._id,
                subCategory: subCategory,
                arabicSubCategory: arabicSubCategory,
                brand: brand,
                ar_brand: arabicBrand,
                material: material,
                ar_material: arabicMaterial,
                size: size,
                ar_size: arabicSize,
                unit: unit,
                ar_unit: arabicUnit,
                avalable_color: availableColor,
                ar_color: arabicAvailableColor,
                flash_sale: flashSale,
                ar_flash_sale: arabicFlashSale
              }
            }),
          };

          response = await fetch(`${SERVER_URL}/update/product`, options);
          switch (response.status) {
            case 200:
              toast("Product Edited Successfully")
              const data = await response.json();
              return data;
            case 400:
              throw new Error('All fields are required');
            case 409:
              throw new Error('User already exists!');
            default:
              throw new Error('Something went wrong!');
          }
        case 400:
          throw new Error('All fields are required');
        case 409:
          throw new Error('User already exists!');
        default:
          throw new Error('Something went wrong!');
      }
    } catch (e) {
      console.log("Error", e);
    }
  },
  placeOrder: async (data, token, language) => {
    const { user, cart } = data;
    try {
      let response;
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ user, cart, language }),
      };

      response = await fetch(`${API_URL}orders`, options);

      switch (response.status) {
        case 200:
          const url = await response.json();
          window.open(url);
          return true;
        case 400:
          alert(response.message);
          throw new Error('All fields are required');
        case 409:
          throw new Error('User already exists!');
        default:
          alert(response.message);
          throw new Error('Something went wrong!');
      }
    } catch (e) {
      alert(e.message);
      console.log('Error', e);
    }
  },
  addRemoveToWishlist: async (data, token, language) => {
    const { userId, productId, type } = data;
    try {
      let response;
      const options = {
        method: type === 'remove' ? 'DELETE' : 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, productId }),
      };

      response = await fetch(`${API_URL}wishlist`, options);

      switch (response.status) {
        case 200:
          const responseData = await response.json();
          return responseData;
        case 400:
          throw new Error(response.message);
        case 409:
          throw { status: response.status, message: response.message };
        default:
          throw new Error('Something went wrong!');
      }
    } catch (e) {
      throw new Error(JSON.stringify({ status: e.status || 500, message: e.message || 'Unknown error' }));
    }
  },
  checkWishlistProduct: async (productId, userId) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      };

      const response = await fetch(`${API_URL}wishlist/check?userId=${userId}&productId=${productId}`, options);

      switch (response.status) {
        case 200:
          const { exists } = await response.json();
          return exists;
        case 400:
          throw new Error('All fields are required');
        case 409:
          throw new Error('User already exists!');
        default:
          throw new Error('Something went wrong!');

      }
    } catch (e) {
      console.log("Error", e);
      return false;
    }
  },
}
