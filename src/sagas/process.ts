import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

import * as actions from '../actions/process';
import { postRecognizeEmotion } from '../api/emotion';
import { postDetectFace } from '../api/face';
import { postDescribePhoto } from '../api/vision';

function* detectFaceSaga(action: typeof actions.detectFace.shape): SagaIterator {
  try {
    const result = yield call(
      postDetectFace,
      action.payload.base64
    );
    yield put(actions.detectFaceSuccess(result));

  } catch (e) {
    yield put(actions.detectFaceError(e));
  }
}

function* recognizeEmotionSaga(action: typeof actions.recognizeEmotion.shape): SagaIterator {
  try {
    const result = yield call(
      postRecognizeEmotion,
      action.payload.base64
    );
    yield put(actions.recognizeEmotionSuccess(result));

  } catch (e) {
    yield put(actions.recognizeEmotionError(e));
  }
}

function* describePhotoSaga(action: typeof actions.describePhoto.shape): SagaIterator {
  try {
    const result = yield call(
      postDescribePhoto,
      action.payload.base64
    );
    yield put(actions.describePhotoSuccess(result));

  } catch (e) {
    yield put(actions.describePhotoError(e));
  }
}

export function* processSaga(): SagaIterator {
  takeEvery(actions.detectFace.type, detectFaceSaga);
  takeEvery(actions.recognizeEmotion.type, recognizeEmotionSaga);
  takeEvery(actions.describePhoto.type, describePhotoSaga);
}
