import { all, spawn, call } from 'redux-saga/effects';
import onboardingSaga from './onboarding/saga';

export default function* rootSaga() {
  const sagas = [
    onboardingSaga,
    ];

  yield all(sagas.map(saga =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.log(e);
        }
      }
    }))
  );
}
