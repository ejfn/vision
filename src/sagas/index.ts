import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { geoLocationSaga } from './geoLocation';
import { processSaga } from './process';

export function* rootSaga(): SagaIterator {
    yield fork(geoLocationSaga);
    yield fork(processSaga);
}
