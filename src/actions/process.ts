import { ImagePicker } from 'expo';

import { ProcessResult } from '../store';
import { createAction } from './action';

export interface RequestPayload {
  base64: string;
}

export const pickImageFromCamera = createAction<'vision/pickImage/fromCamera'>(
  'vision/pickImage/fromCamera'
);

export const pickImageFromLibrary = createAction<'vision/pickImage/fromLibrary'>(
  'vision/pickImage/fromLibrary'
);

export const pickImageStart = createAction<'vision/pickImage/start'>(
  'vision/pickImage/start'
);

export const pickImageSuccess = createAction<'vision/pickImage/success', ImagePicker.ImageInfo>(
  'vision/pickImage/success'
);

export const detectFace = createAction<'vision/process/face/detect', RequestPayload>(
  'vision/process/face/detect'
);

export const recognizeEmotion = createAction<'vision/process/emotion/recognize', RequestPayload>(
  'vision/process/emotion/recognize'
);

export const describePhoto = createAction<'vision/process/photo/describe', RequestPayload>(
  'vision/process/photo/describe'
);
export const processStart = createAction<'vision/process/start'>(
  'vision/process/start'
);

export const processSuccess = createAction<'vision/process/success', ProcessResult>(
  'vision/process/success'
);

export const processError = createAction<'vision/process/error', Error>(
  'vision/process/error'
);
