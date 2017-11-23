import * as actions from '../actions/geoLocation';
import { GeoLocationState } from '../store';
import { INITIAL_STATE } from './initialState';

export function geoLocationReducer(
  state: GeoLocationState = INITIAL_STATE.geoLocation,
  action:
    typeof actions.requestGeoLocationSuccess.shape |
    typeof actions.requestGeoLocationError.shape
): GeoLocationState {
  switch (action.type) {
    case actions.requestGeoLocationSuccess.type:
      const freeGeoIp = action.payload;
      // todo: map freegeoip tp azure location
      const azureLocation = 'westus';
      return {
        ...state,
        freeGeoIp,
        azureLocation
      };
    case actions.requestGeoLocationError.type:
    default:
      return state;
  }
}
