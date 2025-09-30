import { call, put, takeLatest } from 'redux-saga/effects'
import { createAccountSuccess, forgetPasswordResponse, signInSuccess, toggleToast } from '../actions';
import { Api } from './api'
import {
  CREATE_ACCOUNT,
  FORGET_PASSWORD,
  SIGN_IN,
} from './types'
import { setToken } from '@helpers/tokenActions';


function* createAccount(action) {

  try {
    const data = yield call(Api.createAccount, action.payload);
    if (data) {

      yield put(
        toggleToast(true, 'User created successfully!', 'success')
      );
      yield put(createAccountSuccess());
    }

  } catch (error) {
    yield put(
      toggleToast(true, error.message, 'error')
    );
    yield put(createAccountSuccess());

    // yield put(Actions.requestFailed(error.message));
    console.log("error", error);
  }
}

function* signIn(action) {
  try {
    const data = yield call(Api.signIn, action.payload);
    if (data && data?.info?.token) {
      setToken(data.info.token)
      yield put(signInSuccess(data));
    } else {
      yield put(signInSuccess(null));
    }

  } catch (error) {
    yield put(
      toggleToast(true, error.message, 'error')
    );
    yield put(signInSuccess(null));
    console.log('error', error);
  }
}

function* forgetPassword(action) {
  try {
    const response = yield call(Api.forgetPassword, action.payload);
    yield put(
      forgetPasswordResponse({
        resetPasswordStatus: response.data.message
      })
    );
  } catch (error) {
    yield put(forgetPasswordResponse({}));
  }
}

function* onboardingSaga() {
  yield takeLatest(CREATE_ACCOUNT, createAccount);
  yield takeLatest(SIGN_IN, signIn);
  yield takeLatest(FORGET_PASSWORD, forgetPassword);
}

export default onboardingSaga;
