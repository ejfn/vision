import { APP_MODE_EMOTION, APP_MODE_FACE, APP_MODE_VISION } from '../constants';

export type AppMode = typeof APP_MODE_FACE | typeof APP_MODE_EMOTION | typeof APP_MODE_VISION;
