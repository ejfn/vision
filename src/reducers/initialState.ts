import { AppState } from '../store';

export const INITIAL_STATE: AppState = {
    appMode: 'Face',
    process: {
        status: 'ready',
        error: null,
        faceResult: null,
        emotionResult: null,
        visionResult: null,
        totalCalled: 0
    },
    geoLocation: {
        freeGeoIp: {},
        azureLocation: null
    },
    disabled: false
};
