import { API_KEYS, Region } from './config';
import { AppMode } from './constants';

export interface ApiKey {
  url: string;
  key: string;
}

export type RegionalApiKeys = Partial<Record<Region, ApiKey>>;

export function getApiKey(mode: AppMode): ApiKey {
  const region: Region = 'westus';
  const regionalApiKeys: RegionalApiKeys = API_KEYS[mode];
  const apiKey: ApiKey | undefined = regionalApiKeys[region];

  // tslint:disable-next-line:no-non-null-assertion
  return apiKey !== undefined ? apiKey : regionalApiKeys.westus!;
}
