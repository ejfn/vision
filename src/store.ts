import { ImagePicker } from 'expo';

import { FreeGeoIpResult } from './api/freeGeoIp';
import { EmotionResult, FaceResult, VisionResult } from './api/types';
import { AzureLocation } from './config';

export type AppMode = 'Face' | 'Emotion' | 'Vision';

export interface AppState {
  appMode: AppMode;
  processState: ProcessState;
  geoLocation: GeoLocationState;
  disabled: boolean;
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

export interface GeoLocationState {
  freeGeoIp: FreeGeoIpResult;
  azureLocation: AzureLocation;
}
