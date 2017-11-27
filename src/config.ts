import { ContinentCode } from './api/freeGeoIp';
import { RegionalApiKeys } from './apiSelector';
import * as secure from './secure';
import { AppMode } from './store';

export type AzureLocation = 'westus' | 'australiaeast' | 'southeastasia' | 'northeurope';

export const GEO_AZURE_MAP: Record<ContinentCode, AzureLocation> = {
  AF: 'northeurope',
  AN: 'australiaeast',
  AS: 'southeastasia',
  EU: 'northeurope',
  NA: 'westus',
  OC: 'australiaeast',
  SA: 'westus'
};

export const API_KEYS: Record<AppMode, RegionalApiKeys> = {
  Face: {
    westus: {
      url: 'https://westus.api.cognitive.microsoft.com/face/v1.0',
      key: secure.FACE_WESTUS_KEY
    },
    southeastasia: {
      url: 'https://southeastasia.api.cognitive.microsoft.com/face/v1.0',
      key: secure.FACE_SOUTHEASTASIA_KEY
    },
    australiaeast: {
      url: 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0',
      key: secure.FACE_AUSTRALIAEAST_KEY
    },
    northeurope: {
      url: 'https://northeurope.api.cognitive.microsoft.com/face/v1.0',
      key: secure.FACE_NORTHEUROPE_KEY
    }
  },
  Vision: {
    westus: {
      url: 'https://westus.api.cognitive.microsoft.com/vision/v1.0',
      key: secure.VISION_WESTUS_KEY
    },
    southeastasia: {
      url: 'https://southeastasia.api.cognitive.microsoft.com/vision/v1.0',
      key: secure.VISION_SOUTHEASTASIA_KEY
    },
    australiaeast: {
      url: 'https://australiaeast.api.cognitive.microsoft.com/vision/v1.0',
      key: secure.VISION_AUSTRALIAEAST_KEY
    },
    northeurope: {
      url: 'https://northeurope.api.cognitive.microsoft.com/vision/v1.0',
      key: secure.VISION_NORTHEUROPE_KEY
    }
  },
  Emotion: {
    westus: {
      url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0',
      key: secure.EMOTION_WESTUS_KEY
    }
  }
};
