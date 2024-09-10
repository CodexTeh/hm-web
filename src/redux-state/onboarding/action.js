import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  LOGOUT,
} from './types';

export const createAccount = (username, email, password, phone, description, navigation, t) => (
  {
    type: CREATE_ACCOUNT,
    payload: {username, email, password, phone, description, navigation, t},
  }
);

export const createAccountSuccess = () => (
  {
    type: CREATE_ACCOUNT_SUCCESS,
  }
);

export const signIn = (email, password, t) => (
  {
    type: SIGN_IN,
    payload: { email, password, t },
  }
);

export const signInSuccess = (data) => (
  {
    type: SIGN_IN_SUCCESS,
    payload: data,
  }
);

export const logout = () => (
  {
    type: LOGOUT,
  }
);
