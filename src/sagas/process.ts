import { ImagePicker } from 'expo';
import { Alert } from 'react-native';
import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import * as actions from '../actions/process';
import { logApiCalledEvent } from '../api/amplitude';
import { postRecognizeEmotion } from '../api/emotion';
import { postDetectFace } from '../api/face';
import { FreeGeoIpResult } from '../api/freegeoip';
import { FaceResult } from '../api/types';
import { postDescribePhoto } from '../api/vision';
import { extra } from '../config';
import { GEO_COUNTRIES } from '../constants';
import { AppMode, AppState } from '../store';
import { ApiLocationKey, AzureLocation } from '../typings/extra';

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
      Alert.alert(
        'Invalid Media Type!',
        `Media type '${result.type}' is not surpported. Please select a photo and try again.`);
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
      Alert.alert(
        'Invalid Media Type!',
        `Media type '${result.type}' is not surpported. Please select a photo and try again.`);
    }
  }
}

function* detectFaceSaga(action: typeof actions.detectFace.shape): SagaIterator {
  yield put(actions.processStart(undefined));
  const key: ApiLocationKey = yield call(getApiKeyByGeoLocation, 'Face');
  try {
    const result: Array<FaceResult> = yield call(
      postDetectFace,
      action.payload,
      key
    );
    yield call(logApiCalledEvent, 'Face', key.location);
    yield put(actions.processSuccess({ face: result }));
  } catch (e) {
    yield call(logApiCalledEvent, 'Face', key.location, e);
    yield put(actions.processError(e));
  }
}

function* recognizeEmotionSaga(action: typeof actions.recognizeEmotion.shape): SagaIterator {
  yield put(actions.processStart(undefined));
  const key: ApiLocationKey = yield call(getApiKeyByGeoLocation, 'Emotion');
  try {
    const result = yield call(
      postRecognizeEmotion,
      action.payload,
      key
    );
    yield call(logApiCalledEvent, 'Emotion', key.location);
    yield put(actions.processSuccess({ emotion: result }));
  } catch (e) {
    yield call(logApiCalledEvent, 'Emotion', key.location, e);
    yield put(actions.processError(e));
  }
}

function* describePhotoSaga(action: typeof actions.describePhoto.shape): SagaIterator {
  yield put(actions.processStart(undefined));
  const key: ApiLocationKey = yield call(getApiKeyByGeoLocation, 'Vision');
  try {
    const result = yield call(
      postDescribePhoto,
      action.payload,
      key
    );
    yield call(logApiCalledEvent, 'Vision', key.location);
    yield put(actions.processSuccess({ vision: result }));
  } catch (e) {
    yield call(logApiCalledEvent, 'Vision', key.location, e);
    yield put(actions.processError(e));
  }
}

function* getApiKeyByGeoLocation(appMode: AppMode): SagaIterator {
  const geoIp: FreeGeoIpResult = yield select((s: AppState) => s.network.freeGeoIp);

  let azureLocation: AzureLocation | undefined;
  const country = GEO_COUNTRIES.find(i => i.country_iso_code === geoIp.country_code);
  if (country !== undefined) {
    azureLocation = extra.geoAzureLocationMap[country.continent_code];
  }

  switch (appMode) {
    case 'Face':
      return extra.faceApiKeys.find(i => i.location === azureLocation) || extra.faceApiKeys[0];
    case 'Emotion':
      return extra.emotionApiKeys.find(i => i.location === azureLocation) || extra.emotionApiKeys[0];
    case 'Vision':
      return extra.visionApiKeys.find(i => i.location === azureLocation) || extra.visionApiKeys[0];
    default:
      throw new Error(`Unknown app mode ${appMode}`);
  }
}

export function* processSaga(): SagaIterator {
  yield takeLatest(actions.pickImageFromCamera.type, pickImageFromCameraSaga);
  yield takeLatest(actions.pickImageFromLibrary.type, pickImageFromLibrarySaga);
  yield takeLatest(actions.detectFace.type, detectFaceSaga);
  yield takeLatest(actions.recognizeEmotion.type, recognizeEmotionSaga);
  yield takeLatest(actions.describePhoto.type, describePhotoSaga);
}
