import { Amplitude } from 'expo';

import { AppMode } from '../store';
import { AzureLocation } from '../typings/extra';

export function logApiCalledEvent(appMode: AppMode, location: AzureLocation, error?: Error): void {
  const eventName: string = error === undefined ? `${appMode} Api Succeeded` : `${appMode} Api Failed`;
  Amplitude.logEventWithProperties(eventName, {
    apiType: appMode,
    azureLocation: location,
    error
  });
}
