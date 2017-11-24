import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AdMobBanner, AdMobInterstitial, ImagePicker } from 'expo';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProp, NavigationStackScreenOptions } from 'react-navigation';
import { connect, MapStateToProps } from 'react-redux';

import { switchAppMode } from '../actions/appMode';
import { disableProcess } from '../actions/disable';
import { requestGeoLocation } from '../actions/geoLocation';
import { getBannerId, getInterstitialId } from '../adSelector';
import { TEST_DEVICE } from '../config';
import { APP_CONFIG, AppConfig } from '../constants';
import { AppMode, AppState } from '../store';
import { Button } from './Button';

interface OwnProps {
  navigation: NavigationScreenProp<{}, void>;
}

interface StateProps {
  appMode: AppMode;
  disabled: boolean;
  totalCalled: number;
}

interface DispatchProps {
  requestGeoLocation: typeof requestGeoLocation;
  switchAppMode: typeof switchAppMode;
  disableProcess: typeof disableProcess;
}

class InnerMainScreen extends React.PureComponent<OwnProps & StateProps & DispatchProps> {

  public static navigationOptions: NavigationStackScreenOptions = {
    header: null
  };

  public componentDidMount(): void {
    this.props.requestGeoLocation(undefined);
  }

  public render(): JSX.Element {

    const config: AppConfig = APP_CONFIG[this.props.appMode];

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
          <TouchableOpacity onPress={this.onSwitchAppMode} style={styles.appSwitch}>
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
            disabled={this.props.disabled}
          />
          <Button
            icon="md-photos"
            title="Pick From Library"
            style={[styles.button, { backgroundColor: config.color }]}
            onPress={this.pickFromLibrary}
            disabled={this.props.disabled}
          />
          <Text style={[styles.powerdby, { color: config.color }]}>
            Powered by {config.tag}
          </Text>
        </View>
      </View>
    );
  }

  private onAdFailedToLoad = (_: Error): void => {
    this.props.disableProcess(undefined);
    Alert.alert('Sorry', 'Couldn\'t show Ad.');
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
    if ((this.props.totalCalled + 1) % 10 === 0) {
      AdMobInterstitial.setAdUnitID(getInterstitialId(0));
      AdMobInterstitial.setTestDeviceID(TEST_DEVICE);
      AdMobInterstitial.addEventListener(
        'interstitialDidClose',
        () => {
          callback();
        },
        { once: true }
      );
      AdMobInterstitial.requestAd(() => AdMobInterstitial.showAd());
    } else {
      callback();
    }
  }

  private imageSelected = (image: ImagePicker.ImageInfo): void => {
    const title = APP_CONFIG[this.props.appMode].title;
    this.props.navigation.navigate('Photo', { image, title });
  }

  private onSwitchAppMode = () => {
    this.props.switchAppMode(undefined);
  }
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (state: AppState) => {
  return {
    appMode: state.appMode,
    disabled: state.disabled,
    totalCalled: state.process.totalCalled
  };
};

// tslint:disable-next-line:variable-name
export const MainScreen = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps, {
    requestGeoLocation,
    switchAppMode,
    disableProcess
  })(InnerMainScreen);

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
