import { CONFIG } from './config';
import { AppMode } from './store';
import { ApiLocationKey, AzureLocation } from './typings/config';

export function getApiKey(mode: AppMode, azureLocation: AzureLocation): ApiLocationKey {
  // tslint:disable-next-line:switch-default
  switch (mode) {
    case 'Face':
      return CONFIG.faceApiKeys.find(i => i.location === azureLocation) || CONFIG.faceApiKeys[0];
    case 'Vision':
      return CONFIG.visionApiKeys.find(i => i.location === azureLocation) || CONFIG.visionApiKeys[0];
  }
}
