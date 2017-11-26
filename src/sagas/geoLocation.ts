import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as actions from '../actions/geoLocation';
import { queryFreeGeoIp } from '../api/freeGeoIp';

function* requestGeoLocationSaga(): SagaIterator {
  try {
    const result = yield call(queryFreeGeoIp);
    yield put(actions.queryGeoLocationSuccess(result));
  } catch (e) {
    yield put(actions.queryGeoLocationError(e));
  }
}

export function* geoLocationSaga(): SagaIterator {
  yield takeLatest(actions.queryGeoLocation.type, requestGeoLocationSaga);
}
