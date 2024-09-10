const SERVER_URL = "https://d2e4-210-87-64-131.ngrok-free.app";


export const Api = {
  createAccount: async (data) => {
    const { username, email, password, phone, description, t } = data;

    try {
      let response;
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ username: username, email: email, password: password, phone: phone, description: description, userType: "client" }),
      };

      response = await fetch(`${SERVER_URL}/api/auth/signup`, options);

      switch (response.status) {
        case 200:
          const data = await response.json();
          return data;
        case 400:
          throw new Error(t('All fields are required'));
        case 409:
          throw new Error(t('User already exists!'));
        default:
          throw new Error(t('Something went wrong!'));

      }
    } catch (e) {
      console.log("Error", e);
    }
  },
  signIn: async (data) => {
    const { email, password, t } = data;
    try {
      let response;
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password, userType: "client"}),
      };

      response = await fetch(`${SERVER_URL}/api/auth/signin`, options);
      switch (response.status) {
        case 200:
          const data = await response.json();
          return data;
        case 401:
          throw new Error(t('Invalid email or password!'));
        case 404:
          throw new Error(t('User does not exists!'));
        case 400:
          throw new Error(t('All fields required!'));
        case 409:
          throw new Error(t('User already exists!'));

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