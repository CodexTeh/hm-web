import { call, put, select, takeLatest } from 'redux-saga/effects'
import { createAccountSuccess, requestAccessTokenSuccess, signInSuccess, getAccountSuccess, updataProfileSuccess, getAccount } from './action';
import { Api } from './api'
import {
  CREATE_ACCOUNT,
  SIGN_IN,
} from './types'


function* createAccount(action) {

  try {
    const data = yield call(Api.createAccount, action.payload);
    yield put(createAccountSuccess());
  

  } catch (error) {
    yield put(createAccountSuccess());

    // yield put(Actions.requestFailed(error.message));
    console.log("error", error);
  }
}

function* signIn(action) {
  try {
    const data = yield call(Api.signIn, action.payload);
    if (data && data?.info?.token) {
      yield put(signInSuccess(data));
    } else {
      yield put(signInSuccess(null));
    }

  } catch (error) {
    yield put(signInSuccess(null));
    // yield put(Actions.requestFailed(error.message));
    console.log('error', error);
  }
}

function* onboardingSaga() {
  yield takeLatest(CREATE_ACCOUNT, createAccount);
  yield takeLatest(SIGN_IN, signIn);
}

export default onboardingSaga;
