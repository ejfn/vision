import { Platform } from 'react-native';

import * as secure from './secure';

export const TEST_BANNER: string = 'ca-app-pub-3940256099942544/6300978111';
export const TEST_INTERSTITIAL: string = 'ca-app-pub-3940256099942544/4411468910';

export type BannerSpot = 'main' | 'photo';

export function getBannerId(spot: BannerSpot): string {
  switch (spot) {
    case 'main':
      return Platform.OS === 'ios' ? secure.IOS_BANNER_1 : secure.ANDROID_BANNER_1;
    case 'photo':
      return Platform.OS === 'ios' ? secure.IOS_BANNER_2 : secure.ANDROID_BANNER_2;
    default:
      return TEST_BANNER;
  }
}

export function getInterstitialId(): string {
  return Platform.OS === 'ios'
    ? secure.IOS_INTERSTITIAL
    : secure.ANDROID_INTERSTITIAL;
}
