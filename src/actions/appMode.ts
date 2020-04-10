/* eslint-disable import/prefer-default-export */
import { AppMode } from '../store';
import { createAction } from './action';

export const switchAppMode = createAction<'vision/appMode/switch', AppMode>(
  'vision/appMode/switch',
);
