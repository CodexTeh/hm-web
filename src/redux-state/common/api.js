import queryString from 'query-string';

const SERVER_URL = "http://localhost:8080/api/";

export const Api = {
  getProducts: async (pagination) => {

    try {
      let response;
      const options = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      };

      const { page = 1, perPage = 10 } = pagination || {};
      let rangeStart, rangeEnd;
      rangeStart = (page) * (perPage);
      rangeEnd = ((page) + 1) * (perPage) - 1;
      const query = {
        sort: JSON.stringify(['createdAt', 'ASC']),
        range: JSON.stringify([rangeStart, rangeEnd]),
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
  editProducts: async ({ id, data }) => {
    try {
      let response;
      const options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsia2V5IjoibXVoYW1tYWQtYXNpbS0xIiwic3ViIjoiMTcyNTM3NjQ4NDU4MSIsImlzc3VlciI6IjE3MjUzNzY0ODQ1ODEiLCJ1c2VybmFtZSI6Ik11aGFtbWFkIEFzaW0iLCJlbWFpbCI6Im11aGFtbWFkLmFzaW1AY29kaW5nY29wcy5jb20iLCJwcml2YXRlS2V5IjoiMHhlNDUwNzAzZjZhZTkxM2ZlMDBhZGEwZDY0ZDYxZTViODAyZGVhZGNhMDFiZjUwYzA4OGJmNzQ3MDY2ZTEwZDI2Iiwid2FsbGV0UGFzc3BocmFzZSI6ImxvdWQgY2FzaCByZXRyZWF0IHN0cmF0ZWd5IGZlYXR1cmUgYXVndXN0IGxvdWQgc2VhdCB1bmNsZSBjb21pYyBiZXN0IHNjaGVtZSIsImxvY2F0aW9uVGFncyI6W10sInNjaG9vbFRhZ3MiOltdLCJ3b3JrcGxhY2VUYWdzIjpbXSwidGFncyI6W10sInJvbGVzIjpbImFkbWlucyIsImxhd3llcnMiLCJhcHByb3ZlcnMiXSwiaXNGaXJzdExvZ2luIjp0cnVlLCJzdWJzY3JpcHRpb25UYWciOiIiLCJiYWxhbmNlIjoxLjk5OTk4NDA0MDQyNTk5OTksImNyZWRpdHMiOjEwMCwiY3JlZGl0c1Byb2dyZXNzIjoxLjk5OTk4NDA0MDQyNTk5OTksIndhbGxldEFkZHJlc3MiOiIweDgxM0VkOTI5OTEzMjAyMzZlODA1Zjg1NGNGYjAwNDA3NjFFMDAzNTIiLCJpbnZlbnRvckFkZHJlc3MiOiIiLCJjb2lucyI6MCwidGVybXNBZ3JlZSI6ZmFsc2UsImRvd25sb2FkVGVtcGxhdGVzIjpbXSwiZmlsZXMiOlt7InVybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xUa3c1SHY0YlI0WE8xcS0wTEw1MzhoLWVRSk1EME10cXM1M3Zhajg0RU1sZnJpbHV0PXM5Ni1jIn1dLCJmb2xsb3dQcm9maWxlcyI6W10sImZvbGxvd1RhZ3MiOltdLCJlbXBsb3llciI6bnVsbCwiaWRlYVBvaW50cyI6Mjc4MiwiaXNPcGVuQ3RhTW9kYWwiOmZhbHNlLCJjcmVhdGVkQXQiOiIyMDI0LTA5LTAzVDE1OjE0OjQ0LjU5MVoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA5LTExVDA5OjIwOjE1LjY5NloiLCJzdWJzY3JpcHRpb24iOiJzdWJfMVB2Z0tJQkFXOFVPM0J5bjNrVnlNQWFEIiwiaWQiOiI2NmQ3MjdlNDgzNmU1OTk0MjYzNWQ3MDEiLCJmaXJzdE5hbWUiOiJNdWhhbW1hZCIsImxhc3ROYW1lIjoiQXNpbSJ9LCJpYXQiOjI1OTIwMDB9.Zr_f-FInRc_ue_OU8QjQE04Luh9ErUqazwqwbgzlmEY'
        },
      };
      response = await fetch(`${SERVER_URL}products/${id}`, options);

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
}
