import * as actions from '../actions/appMode';
import { AppMode } from '../store';
import { INITIAL_STATE } from './initialState';

const modes: Array<AppMode> = [
  'Face',
  'Vision'
];

export function appModeReducer(
  state: AppMode = INITIAL_STATE.appMode,
  action: typeof actions.switchAppMode.shape
): AppMode {
  if (action.type === actions.switchAppMode.type) {
    const index: number = modes.indexOf(state);
    return modes[(index + 1) % modes.length];
  }
  return state;
}
