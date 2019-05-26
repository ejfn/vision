import * as actions from '../actions/process';
import { ProcessState } from '../store';
import { INITIAL_STATE } from './initialState';

export function processStateReducer(
  state: ProcessState = INITIAL_STATE.processState,
  action:
    typeof actions.pickImageStart.shape |
    typeof actions.pickImageSuccess.shape |
    typeof actions.processStart.shape |
    typeof actions.processSuccess.shape |
    typeof actions.processError.shape
): ProcessState {
  switch (action.type) {
    case actions.pickImageStart.type:
      return {
        ...state,
        status: 'picking',
        image: undefined
      };
    case actions.pickImageSuccess.type:
      return {
        ...state,
        status: 'ready',
        image: action.payload,
        result: undefined,
        error: undefined
      };
    case actions.processStart.type:
      return {
        ...state,
        status: 'requesting',
        totalCalled: state.totalCalled + 1
      };
    case actions.processSuccess.type:
      return {
        ...state,
        status: 'success',
        result: action.payload
      };
    case actions.processError.type:
      return {
        ...state,
        status: 'error',
        error: action.payload
      };
    default:
      return state;
  }
}
