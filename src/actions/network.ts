import { FreeGeoIpResult } from '../api/freeGeoIp';
import { createAction } from './action';

export const checkNetwork = createAction<'vision/network/check'>(
  'vision/network/check'
);

export const connected = createAction<'vision/network/connected'>(
  'vision/network/connected'
);

export const disconnected = createAction<'vision/network/disconnected'>(
  'vision/network/disconnected'
);

export const setGeoLocation = createAction<'vision/network/setGeoLocation', FreeGeoIpResult>(
  'vision/network/setGeoLocation'
);

export const adReceived = createAction<'vision/network/adReceived'>(
  'vision/network/adReceived'
);
