import { Platform } from 'react-native';

import { CONFIG } from './config';
import { AdUnitIds } from './typings/config';

export const TEST_BANNER: string = 'ca-app-pub-3940256099942544/6300978111';
export const TEST_INTERSTITIAL: string = 'ca-app-pub-3940256099942544/4411468910';

export type BannerSpot = 'main' | 'photo';

export function getBannerId(index: number): string {
  const banner: AdUnitIds = CONFIG.adMob.banners[index] || {};
  switch (Platform.OS) {
    case 'ios':
      return banner.ios || TEST_BANNER;
    case 'android':
      return banner.android || TEST_BANNER;
    default:
      return TEST_BANNER;
  }
}

export function getInterstitialId(index: number): string {
  const banner: AdUnitIds = CONFIG.adMob.interstitials[index] || {};
  switch (Platform.OS) {
    case 'ios':
      return banner.ios || TEST_INTERSTITIAL;
    case 'android':
      return banner.android || TEST_INTERSTITIAL;
    default:
      return TEST_INTERSTITIAL;
  }
}

export function getTestDeviceIds(): Array<string> {
  return CONFIG.adMob.testDeviceIds;
}
