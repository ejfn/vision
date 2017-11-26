import * as actions from '../actions/geoLocation';
import { GEO_AZURE_MAP } from '../config';
import { GEO_COUNTRIES } from '../constants';
import { GeoLocationState } from '../store';
import { INITIAL_STATE } from './initialState';

export function geoLocationReducer(
  state: GeoLocationState = INITIAL_STATE.geoLocation,
  action:
    typeof actions.queryGeoLocationSuccess.shape |
    typeof actions.queryGeoLocationError.shape
): GeoLocationState {
  switch (action.type) {
    case actions.queryGeoLocationSuccess.type:
      const freeGeoIp = action.payload;
      let azureLocation = state.azureLocation;
      const country = GEO_COUNTRIES.find(i => i.country_iso_code === freeGeoIp.country_code);
      if (country !== undefined && GEO_AZURE_MAP[country.continent_code] !== undefined) {
        azureLocation = GEO_AZURE_MAP[country.continent_code];
      }
      return {
        ...state,
        freeGeoIp,
        azureLocation
      };
    case actions.queryGeoLocationError.type:
    default:
      return state;
  }
}
