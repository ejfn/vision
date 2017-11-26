import { API_KEYS, AzureLocation } from './config';
import { AppMode } from './store';

export interface ApiKey {
  url: string;
  key: string;
}

export type RegionalApiKeys = Partial<Record<AzureLocation, ApiKey>>;

export function getApiKey(mode: AppMode, azureLocation: AzureLocation): ApiKey {
  const apis = API_KEYS[mode];
  const api = apis[azureLocation];
  // tslint:disable-next-line:no-non-null-assertion
  return api !== undefined ? api : apis.westus!;
}
