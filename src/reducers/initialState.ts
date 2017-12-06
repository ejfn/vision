import { AppState } from '../store';

export const INITIAL_STATE: AppState = {
  network: {
    isConnected: false,
    adReceived: false,
    freeGeoIp: {}
  },
  appMode: 'Face',
  processState: {
    status: 'none',
    image: null,
    result: null,
    error: null,
    totalCalled: 0
  }
};
