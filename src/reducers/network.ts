import * as actions from '../actions/network';
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

      return {
        ...state,
        freeGeoIp
      };
    default:

      return state;
  }
}
