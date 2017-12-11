import { Amplitude } from 'expo';

import { AppMode } from '../store';
import { AzureLocation } from '../typings/extra';

export function logApiCalledEvent(appMode: AppMode, location: AzureLocation, error?: Error): void {
  Amplitude.logEventWithProperties('Api Called', {
    apiType: appMode,
    azureLocation: location,
    succeeded: error === undefined,
    error
  });
}
