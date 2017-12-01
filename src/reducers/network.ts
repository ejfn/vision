import * as actions from '../actions/network';
import { GEO_AZURE_MAP } from '../config';
import { GEO_COUNTRIES } from '../constants';
import { NetworkState } from '../store';
import { INITIAL_STATE } from './initialState';

export function networkReducer(
  state: NetworkState = INITIAL_STATE.network,
  action:
    typeof actions.connected.shape |
    typeof actions.disconnected.shape |
    typeof actions.adReceived.shape |
    typeof actions.setGeoLocation.shape
): NetworkState {
  switch (action.type) {
    case actions.connected.type:
      return {
        ...state,
        isConnected: true
      };
    case actions.disconnected.type:
      return {
        ...state,
        isConnected: false,
        adReceived: true
      };
    case actions.adReceived.type:
      return {
        ...state,
        adReceived: true
      };
    case actions.setGeoLocation.type:
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
    default:
      return state;
  }
}
