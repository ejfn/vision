import * as actions from '../actions/disable';
import { INITIAL_STATE } from './initialState';

export function disabledReducer(
  state: boolean = INITIAL_STATE.disabled,
  action: typeof actions.disableProcess.shape
): boolean {
  if (action.type === actions.disableProcess.type) {
    return true;
  }
  return state;
}
