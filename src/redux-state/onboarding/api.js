const API_URL = process.env.REACT_APP_API_URL;

export const Api = {
  createAccount: async (data) => {
    const { username, email, password, phone, description } = data;

    try {
      let response;
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Content-Security-Policy': 'default-src https:; script-src https: http:',
        },
        body: JSON.stringify({ username: username, email: email, password: password, phone: phone, description: description, userType: "client" }),
      };

      response = await fetch(`${API_URL}auth/signup`, options);

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
  signIn: async (data) => {
    const { email, password } = data;
    try {
      let response;
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Content-Security-Policy': 'default-src https:; script-src https: http:',
        },
        body: JSON.stringify({ email: email, password: password }),
      };

      response = await fetch(`${API_URL}auth/signin`, options);
      switch (response.status) {
        case 200:
          const data = await response.json();
          return data;
        case 401:
          throw new Error('Invalid email or password!');
        case 404:
          throw new Error('User does not exists!');
        case 400:
          throw new Error('All fields required!');
        case 409:
          throw new Error('User already exists!');

        default:
          throw new Error('Something went wrong!');
      }
    } catch (e) {
      console.log("Error", e);
    }
  },

  logout: async () => {

  }
}