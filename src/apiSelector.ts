import { extra } from './config';
import { AppMode } from './store';
import { ApiKey, AzureLocation } from './typings/extra';

export function getApiKey(mode: AppMode, azureLocation: AzureLocation): ApiKey {
  // tslint:disable-next-line:switch-default
  switch (mode) {
    case 'Face':
      return extra.faceApiKeys.find(i => i.location === azureLocation) || extra.faceApiKeys[0];
    case 'Emotion':
      return extra.emotionApiKeys.find(i => i.location === azureLocation) || extra.emotionApiKeys[0];
    case 'Vision':
      return extra.visionApiKeys.find(i => i.location === azureLocation) || extra.visionApiKeys[0];
  }
}
