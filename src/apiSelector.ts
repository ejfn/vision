import { API_KEYS, AzureLocation } from './config';
import { AppMode } from './constants';

export interface ApiKey {
  url: string;
  key: string;
}

export type RegionalApiKeys = Partial<Record<AzureLocation, ApiKey>>;

export function getApiKey(mode: AppMode): ApiKey {
  const region: AzureLocation = 'westus';
  const regionalApiKeys = API_KEYS[mode];
  const apiKey = regionalApiKeys[region];
  // tslint:disable-next-line:no-non-null-assertion
  return apiKey !== undefined ? apiKey : regionalApiKeys.westus!;
}
