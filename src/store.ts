import { FreeGeoIp } from './api/freeGeoIp';
import { EmotionResult, FaceResult, VisionResult } from './api/types';
import { AzureLocation } from './config';

export interface AppState {
  processState: ProcessState;
  geoLocation: GeoLocationState;
}

export type RequestStatus = 'ready' | 'requesting' | 'success' | 'error';

export interface ProcessState {
  status: RequestStatus;
  error: Error | null;
  faceResult: Array<FaceResult> | null;
  emotionResult: Array<EmotionResult> | null;
  visionResult: VisionResult | null;
  totalCalled: number;
  disabled: boolean;
}

export interface GeoLocationState {
  freeGeoIp: FreeGeoIp;
  azureLocation: AzureLocation | null;
}
