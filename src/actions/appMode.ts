import { AppMode } from '../store';
import { createAction } from './action';

export const switchAppMode = createAction<'vision/appMode/switch', AppMode>(
  'vision/appMode/switch'
);
