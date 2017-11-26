import { ImagePicker } from 'expo';
import { Alert } from 'react-native';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as actions from '../actions/process';
import { postRecognizeEmotion } from '../api/emotion';
import { postDetectFace } from '../api/face';
import { FaceResult } from '../api/types';
import { postDescribePhoto } from '../api/vision';

function* pickImageFromCameraSaga(): SagaIterator {
  yield put(actions.pickImageStart(undefined));
  const result: ImagePicker.ImageResult = yield call(
    ImagePicker.launchCameraAsync,
    {
      allowsEditing: true,
      aspect: [1, 1]
    }
  );
  if (!result.cancelled) {
    if (result.type === 'image') {
      yield put(actions.pickImageSuccess(result));
    } else {
      Alert.alert('Unsupported media type', `Media type '${result.type}' is not surpported, please select an image.`);
    }
  }
}

function* pickImageFromLibrarySaga(): SagaIterator {
  yield put(actions.pickImageStart(undefined));
  const result: ImagePicker.ImageResult = yield call(
    ImagePicker.launchImageLibraryAsync,
    {
      allowsEditing: true,
      aspect: [1, 1]
    }
  );
  if (!result.cancelled) {
    if (result.type === 'image') {
      yield put(actions.pickImageSuccess(result));
    } else {
      Alert.alert('Unsupported media type', `Media type '${result.type}' is not surpported, please select an image.`);
    }
  }
}

function* detectFaceSaga(action: typeof actions.detectFace.shape): SagaIterator {
  yield put(actions.processStart(undefined));
  try {
    const result: Array<FaceResult> = yield call(
      postDetectFace,
      action.payload
    );
    yield put(actions.processSuccess({ face: result }));
  } catch (e) {
    yield put(actions.processError(e));
  }
}

function* recognizeEmotionSaga(action: typeof actions.recognizeEmotion.shape): SagaIterator {
  yield put(actions.processStart(undefined));
  try {
    const result = yield call(
      postRecognizeEmotion,
      action.payload
    );
    yield put(actions.processSuccess({ emotion: result }));
  } catch (e) {
    yield put(actions.processError(e));
  }
}

function* describePhotoSaga(action: typeof actions.describePhoto.shape): SagaIterator {
  yield put(actions.processStart(undefined));
  try {
    const result = yield call(
      postDescribePhoto,
      action.payload
    );
    yield put(actions.processSuccess({ vision: result }));
  } catch (e) {
    yield put(actions.processError(e));
  }
}

export function* processSaga(): SagaIterator {
  yield takeLatest(actions.pickImageFromCamera.type, pickImageFromCameraSaga);
  yield takeLatest(actions.pickImageFromLibrary.type, pickImageFromLibrarySaga);
  yield takeLatest(actions.detectFace.type, detectFaceSaga);
  yield takeLatest(actions.recognizeEmotion.type, recognizeEmotionSaga);
  yield takeLatest(actions.describePhoto.type, describePhotoSaga);
}
