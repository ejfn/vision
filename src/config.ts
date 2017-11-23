import { AdUnit } from './adSelector';
import { RegionalApiKeys } from './apiSelector';
import { AppMode } from './constants';

export type AzureLocation = 'westus' | 'australiaeast' | 'southeastasia' | 'northeurope';

export const API_KEYS: Record<AppMode, RegionalApiKeys> = {
  Face: {
    westus: {
      url: 'https://westus.api.cognitive.microsoft.com/face/v1.0',
    },
    southeastasia: {
      url: 'https://southeastasia.api.cognitive.microsoft.com/face/v1.0',
    },
    australiaeast: {
      url: 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0',
    },
    northeurope: {
      url: 'https://northeurope.api.cognitive.microsoft.com/face/v1.0',
    }
  },
  Vision: {
    westus: {
      url: 'https://westus.api.cognitive.microsoft.com/vision/v1.0',
    },
    southeastasia: {
      url: 'https://southeastasia.api.cognitive.microsoft.com/vision/v1.0',
    },
    australiaeast: {
      url: 'https://australiaeast.api.cognitive.microsoft.com/vision/v1.0',
    },
    northeurope: {
      url: 'https://northeurope.api.cognitive.microsoft.com/vision/v1.0',
    }
  },
  Emotion: {
    westus: {
      url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0',
    }
  }
};

export const BANNERS: Array<AdUnit> = [
  {
  },
  {
  }
];

export const INTERSTITIALS: Array<AdUnit> = [
  {
  }
];

export const TEST_BANNER: string = 'ca-app-pub-3940256099942544/6300978111';
export const TEST_INTERSTITIAL: string = 'ca-app-pub-3940256099942544/4411468910';

