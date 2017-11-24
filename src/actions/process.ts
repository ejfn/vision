import { EmotionResult, FaceResult, VisionResult } from '../api/types';
import { createAction } from './action';

export interface RequestPayload {
  base64: string;
}

// detect face
export const detectFace = createAction<'vision/process/face/detect', RequestPayload>(
  'vision/process/face/detect'
);

export const detectFaceStart = createAction<'vision/process/face/detect/start'>(
  'vision/process/face/detect/start'
);

export const detectFaceSuccess = createAction<'vision/process/face/detect/success', Array<FaceResult>>(
  'vision/process/face/detect/success'
);

export const detectFaceError = createAction<'vision/process/face/detect/error', Error>(
  'vision/process/face/detect/error'
);

// recognize emotion
export const recognizeEmotion = createAction<'vision/process/emotion/recognize', RequestPayload>(
  'vision/process/emotion/recognize'
);

export const recognizeEmotionStart = createAction<'vision/process/emotion/recognize/start'>(
  'vision/process/emotion/recognize/start'
);

export const recognizeEmotionSuccess = createAction<'vision/process/emotion/recognize/success', Array<EmotionResult>>(
  'vision/process/emotion/recognize/success'
);

export const recognizeEmotionError = createAction<'vision/process/emotion/recognize/error', Error>(
  'vision/process/emotion/recognize/error'
);

// describe photo
export const describePhoto = createAction<'vision/process/photo/describe', RequestPayload>(
  'vision/process/photo/describe'
);

export const describePhotoStart = createAction<'vision/process/photo/describe/start'>(
  'vision/process/photo/describe/start'
);

export const describePhotoSuccess = createAction<'vision/process/photo/describe/success', VisionResult>(
  'vision/process/photo/describe/success'
);

export const describePhotoError = createAction<'vision/process/photo/describe/error', Error>(
  'vision/process/photo/describe/error'
);
