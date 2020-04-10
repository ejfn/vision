import * as NetInfo from '@react-native-community/netinfo';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { NetInfoState } from '@react-native-community/netinfo';
import * as actions from '../actions/network';
import { queryFreeGeoIp } from '../api/freegeoip';

function* checkNetworkSaga(): SagaIterator {
  const state: NetInfoState = yield call(NetInfo.fetch);
  if (state.isConnected) {
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

export default function* (): SagaIterator {
  yield takeLatest(actions.checkNetwork.type, checkNetworkSaga);
}
