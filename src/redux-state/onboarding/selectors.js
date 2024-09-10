import { useSelector } from 'react-redux';

export const GetUserRegisterationLoader = () =>
  useSelector(
    (state) => state.onboarding.createAccountLoading);
export const GetUserLoginLoader = () =>
  useSelector(
    (state) => state.onboarding.signInloading);
export const GetToken = () =>
  useSelector(
    (state) => state.onboarding.token);