import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AdMobBanner, AdMobInterstitial, ImagePicker } from 'expo';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProp, NavigationStackScreenOptions } from 'react-navigation';

import { INTERSTITIAL_AD, MAIN_SCREEN_AD } from '../config';
import { APP_MODE_EMOTION, APP_MODE_FACE, APP_MODE_VISION } from '../constants';
import { AppMode } from '../types/common';
import { Button } from './Button';

const COLOR: { [key: string]: string } = {
  Face: '#4169e1',
  Emotion: '#ba55d3',
  Vision: '#2e8b57'
};

const LOGO: { [key: string]: string } = {
  Face: 'emoticon',
  Emotion: 'emoticon-devil',
  Vision: 'tag-text-outline'
};

const TITLE: { [key: string]: string } = {
  Face: 'Face Detection',
  Emotion: 'Mood Detection',
  Vision: 'Image Tagging'
};

const API: { [key: string]: string } = {
  Face: 'Microsoft Face API',
  Emotion: 'Microsoft Emotion API',
  Vision: 'Microsoft Computer Vision API'
};

const MODES: Array<AppMode> = [
  APP_MODE_FACE,
  APP_MODE_EMOTION,
  APP_MODE_VISION
];

interface Props {
  navigation: NavigationScreenProp<{}, void>;
}

interface State {
  mode: AppMode;
  count: number;
  disabled: boolean;
}

export class MainScreen extends React.PureComponent<Props, State> {

  public static navigationOptions: NavigationStackScreenOptions = {
    header: null
  };

  public state: State = {
    mode: MODES[0],
    count: 0,
    disabled: false
  };

  public render(): JSX.Element {

    const color: string = COLOR[this.state.mode];

    return (
      <View style={styles.container} >
        <View style={styles.banner}>
          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID={MAIN_SCREEN_AD}
            onAdFailedToLoad={this.onAdFailedToLoad} />
        </View>
        <View style={styles.main} >
          <TouchableOpacity onPress={this.switchMode} style={styles.appSwitch}>
            <MaterialCommunityIcons name={LOGO[this.state.mode]} size={100} color={color} />
            <Text style={[styles.appSwtichText, { color: color }]}>{TITLE[this.state.mode]}</Text>
            <Text style={{ color: color }}>Tap me to switch mode!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom} >
          <Button
            icon="md-camera"
            title="Take A Photo"
            style={[styles.button, { backgroundColor: color }]}
            onPress={this.pickFromCamera}
            disabled={this.state.disabled}
          />
          <Button
            icon="md-photos"
            title="Pick From Library"
            style={[styles.button, { backgroundColor: color }]}
            onPress={this.pickFromLibrary}
            disabled={this.state.disabled}
          />
          <Text style={[styles.powerdby, { color: color }]}>
            Powered by {API[this.state.mode]}
          </Text>
        </View>
      </View>
    );
  }

  private onAdFailedToLoad = (_: Error): void => {
    this.setState((state: State) => ({ ...state, disabled: true }));
    Alert.alert('Oops!', 'Failed to load Ad!');
  }

  private switchMode = (): void => {
    const currentIndex: number = MODES.indexOf(this.state.mode);
    const nextIndex: number = currentIndex < MODES.length - 1 ? currentIndex + 1 : 0;
    const nextMode: AppMode = MODES[nextIndex];
    this.setState((state: State) => ({ ...state, mode: nextMode }));
  }

  private pickFromCamera = async (): Promise<void> => {
    const result: ImagePicker.ImageResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });

    if (!result.cancelled) {
      this.interstitialCall(() => this.imageSelected(result));
    }
  }

  private pickFromLibrary = async (): Promise<void> => {
    const result: ImagePicker.ImageResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });

    if (!result.cancelled) {
      this.interstitialCall(() => this.imageSelected(result));
    }
  }

  private interstitialCall = (callback: () => void): void => {
    if (this.state.count >= 10) {
      AdMobInterstitial.setAdUnitID(INTERSTITIAL_AD);
      AdMobInterstitial.addEventListener(
        'adClosed',
        () => {
          this.setState((state: State) => ({ ...state, count: 1 }));
          callback();
        },
        { once: true }
      );
      AdMobInterstitial.requestAd(() => AdMobInterstitial.showAd());
    } else {
      this.setState((state: State) => ({ ...state, count: state.count + 1 }));
      callback();
    }
  }

  private imageSelected = (image: ImagePicker.ImageInfo): void => {
    this.props.navigation.navigate('Photo', { mode: this.state.mode, title: TITLE[this.state.mode], image });
  }
}

// tslint:disable-next-line:no-any
const styles: any = StyleSheet.create({
  container: {
    flex: 1
  },
  banner: {
    flex: 0.1,
    justifyContent: 'flex-end'
  },
  main: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  appSwitch: {
    alignItems: 'center'
  },
  appSwitchText: {
    fontSize: 20
  },
  bottom: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10
  },
  button: {
    alignSelf: 'stretch',
    marginVertical: 5
  },
  poweredby: {
    marginVertical: 10
  }
});
