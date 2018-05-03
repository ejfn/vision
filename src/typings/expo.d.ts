import * as expo from 'expo';

declare module 'expo' {
  namespace ImagePicker {

    interface CameraOptions {
      mediaTypes?: keyof _MediaTypeOptions;
      allowsEditing?: boolean
      aspect?: [number, number]
      quality?: number
    }
  }

  namespace AdMobInterstitial {
    function addEventListener(event: AdMobInterstitialEmptyEvent, handler: () => void, { }): void;
  }

}
