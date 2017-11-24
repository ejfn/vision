import * as actions from '../actions/process';
import { ProcessState } from '../store';
import { INITIAL_STATE } from './initialState';

export function processReducer(
  state: ProcessState = INITIAL_STATE.process,
  action:
    typeof actions.detectFaceStart.shape |
    typeof actions.detectFaceSuccess.shape |
    typeof actions.detectFaceError.shape |
    typeof actions.recognizeEmotionStart.shape |
    typeof actions.recognizeEmotionSuccess.shape |
    typeof actions.recognizeEmotionError.shape |
    typeof actions.describePhotoStart.shape |
    typeof actions.describePhotoSuccess.shape |
    typeof actions.describePhotoError.shape
): ProcessState {
  switch (action.type) {
    case actions.detectFaceStart.type:
      return {
        ...state,
        status: 'requesting',
        faceResult: null,
        totalCalled: state.totalCalled + 1
      };
    case actions.detectFaceSuccess.type:
      return {
        ...state,
        status: 'success',
        faceResult: action.payload
      };
    case actions.detectFaceError.type:
      return {
        ...state,
        status: 'error',
        error: action.payload
      };
    case actions.recognizeEmotionStart.type:
      return {
        ...state,
        status: 'requesting',
        emotionResult: null,
        error: null,
        totalCalled: state.totalCalled + 1
      };
    case actions.recognizeEmotionSuccess.type:
      return {
        ...state,
        status: 'success',
        emotionResult: action.payload
      };
    case actions.recognizeEmotionError.type:
      return {
        ...state,
        status: 'error',
        error: action.payload
      };
    case actions.describePhotoStart.type:
      return {
        ...state,
        status: 'requesting',
        visionResult: null,
        error: null,
        totalCalled: state.totalCalled + 1
      };
    case actions.describePhotoSuccess.type:
      return {
        ...state,
        status: 'success',
        visionResult: action.payload
      };
    case actions.describePhotoError.type:
      return {
        ...state,
        status: 'error',
        error: action.payload
      };
    default:
      return state;
  }
}
