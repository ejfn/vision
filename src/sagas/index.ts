/* eslint-disable import/prefer-default-export */
import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import networkSaga from './network';
import { processSaga } from './process';

export function* rootSaga(): SagaIterator {
  yield fork(networkSaga);
  yield fork(processSaga);
}
