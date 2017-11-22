import { Platform, PlatformOSType } from 'react-native';

import { BANNERS, INTERSTITIALS, TEST_BANNER, TEST_INTERSTITIAL } from './config';

export type AdUnit = Partial<Record<PlatformOSType, string>>;

export function getBannerId(index: number): string {
  const adUnitId: string | undefined = BANNERS[index][Platform.OS];

  return adUnitId !== undefined ? adUnitId : TEST_BANNER;
}

export function getInterstitialId(index: number): string {
  const adUnitId: string | undefined = INTERSTITIALS[index][Platform.OS];

  return adUnitId !== undefined ? adUnitId : TEST_INTERSTITIAL;
}
