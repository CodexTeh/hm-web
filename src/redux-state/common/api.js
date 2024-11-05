import queryString from 'query-string';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "http://213.210.21.52:8080/api/";
// const API_URL = "http://localhost:8080/api/";

const SERVER_URL = "https://dessco-stagging-15003402.dev.odoo.com";

export const Api = {
  getProducts: async ({ pagination }) => {
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
      const options = {
        method: 'GET',
      };

      response = await fetch(`${API_URL}categories`, options);

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
}
