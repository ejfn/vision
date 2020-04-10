import { AppState } from '../store';

export default {
  network: {
    isConnected: false,
    adReceived: false,
    freeGeoIp: {},
  },
  appMode: 'Face',
  processState: {
    status: 'none',
    image: undefined,
    result: undefined,
    error: undefined,
    totalCalled: 0,
  },
} as AppState;
