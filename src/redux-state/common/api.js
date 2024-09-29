import queryString from 'query-string';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SERVER_URL = "http://89.116.20.12:8080/api/";

export const Api = {
  getProducts: async ({ pagination, searchText }) => {
    try {
      let response;
      const options = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Content-Security-Policy': 'default-src https:; script-src https: http:',
        },
      };

      const { page = 1, perPage = 10 } = pagination || {};
      let rangeStart, rangeEnd;
      rangeStart = (page) * (perPage);
      rangeEnd = ((page) + 1) * (perPage) - 1;
      const query = {
        sort: JSON.stringify(['createdAt', 'ASC']),
        range: JSON.stringify([rangeStart, rangeEnd]),
        filter: JSON.stringify({ '$custom': { 'search': searchText } }),
      };

      response = await fetch(`${SERVER_URL}products?${queryString.stringify(query)}`, options);

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
  editProducts: async ({ id, data }, token) => {
    try {
      const { category, name, price, qtyOnHand, tax, images } = data;
      let response;

      const formData = new FormData();

      formData.append('category', category);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('qtyOnHand', qtyOnHand);
      formData.append('tax', tax);

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
      response = await fetch(`${SERVER_URL}products/${id}`, options);

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
    } catch (e) {
      console.log("Error", e);
    }
  },
}
