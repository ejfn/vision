import { ImagePicker } from 'expo';

import { FreeGeoIpResult } from './api/freeGeoIp';
import { EmotionResult, FaceResult, VisionResult } from './api/types';

export type AppMode = 'Face' | 'Emotion' | 'Vision';

export interface AppState {
  network: NetworkState;
  appMode: AppMode;
  processState: ProcessState;
}

export interface NetworkState {
  isConnected: boolean;
  adReceived: boolean;
  freeGeoIp: FreeGeoIpResult;
}

export type ProcessStatus = 'none' | 'picking' | 'ready' | 'requesting' | 'success' | 'error';

export interface ProcessResult {
  face?: Array<FaceResult>;
  emotion?: Array<EmotionResult>;
  vision?: VisionResult;
}

export interface ProcessState {
  status: ProcessStatus;
  image: ImagePicker.ImageInfo | null;
  result: ProcessResult | null;
  error: Error | null;
  totalCalled: number;
}
