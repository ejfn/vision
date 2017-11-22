import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AdMobBanner, AdMobInterstitial, ImagePicker } from 'expo';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProp, NavigationStackScreenOptions } from 'react-navigation';

import { getBannerId, getInterstitialId } from '../adSelector';
import { TEST_DEVICE } from '../config';
import { AppMode, MAIN_SCREEN_CONFIG, MainScreenConfig } from '../constants';
import { Button } from './Button';

const MODES: Array<AppMode> = [
  'Face',
  'Emotion',
  'Vision'
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

    const config: MainScreenConfig = MAIN_SCREEN_CONFIG[this.state.mode];

    return (
      <View style={styles.container} >
        <View style={styles.banner}>
          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID={getBannerId(0)}
            testDeviceID={TEST_DEVICE}
            didFailToReceiveAdWithError={this.onAdFailedToLoad} />
        </View>
        <View style={styles.main} >
          <TouchableOpacity onPress={this.switchMode} style={styles.appSwitch}>
            <MaterialCommunityIcons name={config.logo} size={100} color={config.color} />
            <Text style={[styles.appSwtichText, { color: config.color }]}>{config.title}</Text>
            <Text style={{ color: config.color }}>Tap me to switch mode!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom} >
          <Button
            icon="md-camera"
            title="Take A Photo"
            style={[styles.button, { backgroundColor: config.color }]}
            onPress={this.pickFromCamera}
            disabled={this.state.disabled}
          />
          <Button
            icon="md-photos"
            title="Pick From Library"
            style={[styles.button, { backgroundColor: config.color }]}
            onPress={this.pickFromLibrary}
            disabled={this.state.disabled}
          />
          <Text style={[styles.powerdby, { color: config.color }]}>
            Powered by {config.tag}
          </Text>
        </View>
      </View>
    );
  }

  private onAdFailedToLoad = (_: Error): void => {
    this.setState((state: State) => ({ ...state, disabled: true }));
    Alert.alert('Sorry', 'Couldn\'t display Ad from Google.');
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
      this.interstitialCall(() => {
        this.imageSelected(result);
      });
    }
  }

  private pickFromLibrary = async (): Promise<void> => {
    const result: ImagePicker.ImageResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });

    if (!result.cancelled) {
      this.interstitialCall(() => {
        this.imageSelected(result);
      });
    }
  }

  private interstitialCall = (callback: () => void): void => {
    if (this.state.count >= 10) {
      AdMobInterstitial.setAdUnitID(getInterstitialId(0));
      AdMobInterstitial.setTestDeviceID(TEST_DEVICE);
      AdMobInterstitial.addEventListener(
        'interstitialDidClose',
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
    const config: MainScreenConfig = MAIN_SCREEN_CONFIG[this.state.mode];
    this.props.navigation.navigate('Photo', { mode: this.state.mode, title: config.title, image });
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
