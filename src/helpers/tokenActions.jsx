import Cookies from 'universal-cookie';
import constants from './constants';

const getToken = () => {
  return new Cookies().get(constants.TOKEN);
};

const removeToken = () => {
  new Cookies().remove(constants.TOKEN, { path: '/' });
};

const setToken = (token) => {
  new Cookies().set(constants.TOKEN, token, {
    secure: true,
    path: '/',
    sameSite: 'none',
    maxAge: parseInt(constants.AUTH_TOKEN_LIFE_SPAN.toString()) // 7 days
  });
};

export {
  getToken,
  removeToken,
  setToken,
};
