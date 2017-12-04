import { Platform } from 'react-native';

import { extra } from './config';

export const TEST_BANNER: string = 'ca-app-pub-3940256099942544/6300978111';
export const TEST_INTERSTITIAL: string = 'ca-app-pub-3940256099942544/4411468910';

export type BannerSpot = 'main' | 'photo';

export function getBannerId(spot: BannerSpot): string {
  const adMob = extra.adMobSettings;
  switch (spot) {
    case 'main':
      if (adMob.banner1) {
        // tslint:disable-next-line:switch-default
        switch (Platform.OS) {
          case 'ios':
            return adMob.banner1.ios || TEST_BANNER;
          case 'android':
            return adMob.banner1.android || TEST_BANNER;
        }
      }
    case 'photo':
      if (adMob.banner2) {
        // tslint:disable-next-line:switch-default
        switch (Platform.OS) {
          case 'ios':
            return adMob.banner2.ios || TEST_BANNER;
          case 'android':
            return adMob.banner2.android || TEST_BANNER;
        }
      }
    default:
      return TEST_BANNER;
  }
}

export function getInterstitialId(): string {
  const adMob = extra.adMobSettings;
  if (adMob.interstitial) {
    // tslint:disable-next-line:switch-default
    switch (Platform.OS) {
      case 'ios':
        return adMob.interstitial.ios || TEST_INTERSTITIAL;
      case 'android':
        return adMob.interstitial.android || TEST_INTERSTITIAL;
    }
  }
  return TEST_INTERSTITIAL;
}

export function getTestDeviceId(): string {
  return extra.adMobSettings.testDeviceId || '';
}
