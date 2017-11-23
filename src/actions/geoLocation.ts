import { FreeGeoIp } from '../api/freeGeoIp';
import { createAction } from './action';

export const requestGeoLocation = createAction<'vision/geoLocation/request'>(
  'vision/geoLocation/request'
);

export const requestGeoLocationSuccess = createAction<'vision/geoLocation/request/success', FreeGeoIp>(
  'vision/geoLocation/request/success'
);

export const requestGeoLocationError = createAction<'vision/geoLocation/request/error', Error>(
  'vision/geoLocation/request/error'
);
