import constants from './constants';

const getToken = () => {
  try {
    return localStorage.getItem(constants.TOKEN);
  } catch (err) {
    console.error("Error getting token:", err);
    return null;
  }
};

const removeToken = () => {
  try {
    localStorage.removeItem(constants.TOKEN);
  } catch (err) {
    console.error("Error removing token:", err);
  }
};

const setToken = (token) => {
  try {
    localStorage.setItem(constants.TOKEN, token);

    // Optional: manually handle expiration (localStorage does not support it)
    if (constants.AUTH_TOKEN_LIFE_SPAN) {
      const expiryTime = Date.now() + parseInt(constants.AUTH_TOKEN_LIFE_SPAN.toString()) * 1000; 
      localStorage.setItem(`${constants.TOKEN}_expiresAt`, expiryTime.toString());
    }
  } catch (err) {
    console.error("Error setting token:", err);
  }
};

export {
  getToken,
  removeToken,
  setToken,
};
