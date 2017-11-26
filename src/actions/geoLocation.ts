import { FreeGeoIpResult } from '../api/freeGeoIp';
import { createAction } from './action';

export const queryGeoLocation = createAction<'vision/geoLocation/query'>(
  'vision/geoLocation/query'
);

export const queryGeoLocationSuccess = createAction<'vision/geoLocation/query/success', FreeGeoIpResult>(
  'vision/geoLocation/query/success'
);

export const queryGeoLocationError = createAction<'vision/geoLocation/query/error', Error>(
  'vision/geoLocation/query/error'
);
