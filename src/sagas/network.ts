import { NetInfo } from 'react-native';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as actions from '../actions/network';
import { queryFreeGeoIp } from '../api/freeGeoIp';

function* checkNetworkSaga(): SagaIterator {
  const isConnected = yield call(NetInfo.isConnected.fetch);
  if (isConnected) {
    yield put(actions.connected(undefined));
    try {
      const result = yield call(queryFreeGeoIp);
      yield put(actions.setGeoLocation(result));
    } catch {
      // do nothing
    }
  } else {
    yield put(actions.disconnected(undefined));
  }
}

export function* networkSaga(): SagaIterator {
  yield takeLatest(actions.checkNetwork.type, checkNetworkSaga);
}
