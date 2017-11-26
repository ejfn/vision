import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AdMobBanner, AdMobInterstitial } from 'expo';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProp, NavigationStackScreenOptions } from 'react-navigation';
import { connect, MapStateToProps } from 'react-redux';

import { switchAppMode } from '../actions/appMode';
import { disableProcess } from '../actions/disable';
import { queryGeoLocation } from '../actions/geoLocation';
import { pickImageFromCamera, pickImageFromLibrary } from '../actions/process';
import { getBannerId, getInterstitialId } from '../adSelector';
import { TEST_DEVICE } from '../config';
import { APP_CONFIG, AppConfig } from '../constants';
import { AppMode, AppState, ProcessState } from '../store';
import { Button } from './Button';

interface OwnProps {
  navigation: NavigationScreenProp<{}, void>;
}

interface StateProps {
  appMode: AppMode;
  processState: ProcessState;
  disabled: boolean;
  totalCalled: number;
}

interface DispatchProps {
  queryGeoLocation: typeof queryGeoLocation;
  switchAppMode: typeof switchAppMode;
  disableProcess: typeof disableProcess;
  pickImageFromCamera: typeof pickImageFromCamera;
  pickImageFromLibrary: typeof pickImageFromLibrary;
}

class InnerMainScreen extends React.PureComponent<OwnProps & StateProps & DispatchProps> {

  public static navigationOptions: NavigationStackScreenOptions = {
    header: null
  };

  public componentDidMount(): void {
    this.props.queryGeoLocation(undefined);
  }

  public componentDidUpdate(): void {
    if (this.props.processState.status === 'ready') {
      this.checkInterstitial(() => {
        const title = APP_CONFIG[this.props.appMode].title;
        this.props.navigation.navigate('Photo', { title });
      });
    }
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
            <Text style={{ color: config.color }}>{config.title}</Text>
            <Text style={{ color: config.color }}>Tap me!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom} >
          <Button
            icon="md-camera"
            title="Take A Photo"
            style={[styles.button, { backgroundColor: config.color }]}
            onPress={this.onPickFromCamera} />
          <Button
            icon="md-photos"
            title="Pick From Library"
            style={[styles.button, { backgroundColor: config.color }]}
            onPress={this.onPickFromLibrary} />
          <Text style={{ color: config.color }}>
            Powered by {config.tag}
          </Text>
        </View>
      </View>
    );
  }

  private onAdFailedToLoad = (_: Error): void => {
    this.props.disableProcess(undefined);
  }

  private onPickFromCamera = () => {
    if (this.props.disabled) {
      Alert.alert('Sorry', 'Service is not available in your country.');
    } else {
      this.props.pickImageFromCamera(undefined);
    }
  }

  private onPickFromLibrary = () => {
    if (this.props.disabled) {
      Alert.alert('Sorry', 'Service is not available in your country.');
    } else {
      this.props.pickImageFromLibrary(undefined);
    }
  }

  private checkInterstitial = (callback: () => void): void => {
    if (this.props.totalCalled > 0 && this.props.totalCalled % 3 === 0) {
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

  private onSwitchAppMode = () => {
    this.props.switchAppMode(undefined);
  }
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (state: AppState) => {
  return {
    appMode: state.appMode,
    processState: state.processState,
    disabled: state.disabled,
    totalCalled: state.processState.totalCalled
  };
};

// tslint:disable-next-line:variable-name
export const MainScreen = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps, {
    queryGeoLocation,
    switchAppMode,
    disableProcess,
    pickImageFromCamera,
    pickImageFromLibrary
  })(InnerMainScreen);

const styles = StyleSheet.create({
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
  bottom: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10
  },
  button: {
    alignSelf: 'stretch',
    marginVertical: 5
  }
});
