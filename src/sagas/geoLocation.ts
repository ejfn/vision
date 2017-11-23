import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as actions from '../actions/geoLocation';
import { getFreeGeoIp } from '../api/freeGeoIp';

function* requestGeoLocationSaga(): SagaIterator {
  try {
    const result = yield call(
      getFreeGeoIp
    );
    yield put(actions.requestGeoLocation(result));

  } catch (e) {
    yield put(actions.requestGeoLocation(e));
  }
}

export function* geoLocationSaga(): SagaIterator {
  yield takeLatest(actions.requestGeoLocation, requestGeoLocationSaga);
}
