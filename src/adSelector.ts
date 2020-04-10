import { Platform } from 'react-native';
import { AdUnitIds, CONFIG } from './config';

export const TEST_BANNER: string = 'ca-app-pub-3940256099942544/6300978111';
export type BannerSpot = 'main' | 'photo';

export function getBannerId(index: number): string {
  if (__DEV__) {
    return TEST_BANNER;
  }
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
