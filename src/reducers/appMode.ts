import * as actions from '../actions/appMode';
import { AppMode } from '../store';
import { INITIAL_STATE } from './initialState';

export function appModeReducer(
  state: AppMode = INITIAL_STATE.appMode,
  action: typeof actions.switchAppMode.shape
): AppMode {
  if (action.type === actions.switchAppMode.type) {
    return action.payload;
  }

  return state;
}
