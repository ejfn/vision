import { FreeGeoIp } from './api/freeGeoIp';
import { EmotionResult, FaceResult, VisionResult } from './api/types';
import { AzureLocation } from './config';

export type AppMode = 'Face' | 'Emotion' | 'Vision';

export interface AppConfig {
  color: string;
  logo: string;
  title: string;
  tag: string;
}

export interface AppState {
  appMode: AppMode;
  process: ProcessState;
  geoLocation: GeoLocationState;
  disabled: boolean;
}

export type RequestStatus = 'ready' | 'requesting' | 'success' | 'error';

export interface ProcessState {
  status: RequestStatus;
  error: Error | null;
  faceResult: Array<FaceResult> | null;
  emotionResult: Array<EmotionResult> | null;
  visionResult: VisionResult | null;
  totalCalled: number;
}

export interface GeoLocationState {
  freeGeoIp: FreeGeoIp;
  azureLocation: AzureLocation | null;
}
