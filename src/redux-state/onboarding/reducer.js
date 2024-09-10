import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  LOGOUT
} from './types';

const INITIAL_STATE = {
  login: false,
  createAccountLoading: false,
  signInloading: false,
  token: null,
  user: null,

};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {

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
