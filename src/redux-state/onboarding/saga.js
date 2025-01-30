import { call, put, select, takeLatest } from 'redux-saga/effects'
import { createAccountSuccess, signInSuccess, toggleToast } from '../actions';
import { Api } from './api'
import {
  CREATE_ACCOUNT,
  SIGN_IN,
} from './types'
import { setToken } from '@helpers/tokenActions';


function* createAccount(action) {

  try {
    yield call(Api.createAccount, action.payload);

    yield put(
      toggleToast(true, 'User created successfully!', 'success')
    );
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
      setToken(data.info.token)
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
