import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  LOGOUT,
} from './types';

export const createAccount = (username, email, password, phone, address) => (
  {
    type: CREATE_ACCOUNT,
    payload: { username, email, password, phone, address },
  }
);

export const createAccountSuccess = () => (
  {
    type: CREATE_ACCOUNT_SUCCESS,
  }
);

export const signIn = (email, password) => (
  {
    type: SIGN_IN,
    payload: { email, password },
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
