/* eslint-disable import/no-anonymous-default-export */
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  LOGOUT,
  FORGET_PASSWORD_RESPONSE,
  FORGET_PASSWORD,
} from './types';

const INITIAL_STATE = {
  login: false,
  createAccountLoading: false,
  signInloading: false,
  token: null,
  user: null,
  resetPasswordLoading: false,
  resetPasswordStatus: '',
};

export default (state = INITIAL_STATE, action) => {
  const { type } = action;
  switch (type) {

    case FORGET_PASSWORD:
      return { ...state, resetPasswordLoading: true };

    case FORGET_PASSWORD_RESPONSE:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordStatus: action.payload?.resetPasswordStatus ?? ''
      };

    case LOGOUT:
      return { ...state, token: null, user: null };

    case CREATE_ACCOUNT:
      return { ...state, createAccountLoading: true };

    case CREATE_ACCOUNT_SUCCESS:
      return { ...state, createAccountLoading: false };

    case SIGN_IN:
      return { ...state, signInloading: true };

    case SIGN_IN_SUCCESS:
      return { ...state, signInloading: false, token: action.payload?.info?.token, user: action?.payload?.user };

    default:
      return state;
  }
};
