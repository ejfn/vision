/* eslint-disable import/prefer-default-export */
import { ApiLocationKey, AzureLocation, CONFIG } from './config';
import { AppMode } from './store';

export function getApiKey(
  mode: AppMode,
  azureLocation: AzureLocation,
): ApiLocationKey {
  switch (mode) {
    case 'Face':
      return CONFIG.faceApiKeys.find((i) => i.location === azureLocation)
        || CONFIG.faceApiKeys[0];
    case 'Vision':
      return CONFIG.visionApiKeys.find((i) => i.location === azureLocation)
        || CONFIG.visionApiKeys[0];
    default:
      throw new Error(`unknow mode ${mode}`);
  }
}
