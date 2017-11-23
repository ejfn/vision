import { AppState } from '../store';

export const INITIAL_STATE: AppState = {
    processState: {
        status: 'ready',
        error: null,
        faceResult: null,
        emotionResult: null,
        visionResult: null,
        totalCalled: 0,
        disabled: false
    },
    geoLocation: {
        freeGeoIp: {},
        azureLocation: null
    }
};
