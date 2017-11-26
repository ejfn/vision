import { AppState } from '../store';

export const INITIAL_STATE: AppState = {
  appMode: 'Face',
  processState: {
    status: 'none',
    image: null,
    result: null,
    error: null,
    totalCalled: 0
  },
  geoLocation: {
    freeGeoIp: {},
    azureLocation: 'westus'
  },
  disabled: false
};
