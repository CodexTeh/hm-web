import { call, put, select, takeLatest } from 'redux-saga/effects'
import { createAccountSuccess, forgetPasswordResponse, openLoginModal, openRegisterModal, signInSuccess, toggleToast } from '../actions';
import { Api } from './api'
import {
  CREATE_ACCOUNT,
  FORGET_PASSWORD,
  SIGN_IN,
} from './types'
import { setToken } from 'helpers/tokenActions';

const getLanguage = state => state.common.language;


function* createAccount(action) {

  try {
    const language = yield select(getLanguage);
    yield call(Api.createAccount, action.payload, language);
    yield put(
      toggleToast(true, language === 'en'? 'User created successfully!' : 'تم إنشاء المستخدم بنجاح!', 'success')
    );
    yield put(createAccountSuccess());
    yield put(openRegisterModal(false));
    yield put(openLoginModal(true));
  } catch (error) {
    yield put(
      toggleToast(true, error.message, 'error')
    );
    yield put(createAccountSuccess());
    console.log("error", error);
  }
}

function* signIn(action) {
  try {
    const language = yield select(getLanguage);

    const data = yield call(Api.signIn, action.payload, language);
    if (data && data?.info?.token) {
      setToken(data.info.token)
      yield put(
        toggleToast(true, language === 'en' ? 'User login successfully!' : 'تم تسجيل دخول المستخدم بنجاح!', 'success')
      );
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
    const language = yield select(getLanguage);

    const response = yield call(Api.forgetPassword, action.payload, language);
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
