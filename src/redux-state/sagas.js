import { all, spawn, call } from 'redux-saga/effects';
import onboardingSaga from './onboarding/saga';
import commonSaga from './common/saga';

export default function* rootSaga() {
  const sagas = [
    onboardingSaga,
    commonSaga
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
