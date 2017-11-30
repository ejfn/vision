import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AdMobBanner, AdMobInterstitial } from 'expo';
import React from 'react';
import { Alert, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProp, NavigationStackScreenOptions } from 'react-navigation';
import { connect, MapStateToProps } from 'react-redux';

import { switchAppMode } from '../actions/appMode';
import { disableProcess } from '../actions/disable';
import { queryGeoLocation } from '../actions/geoLocation';
import { pickImageFromCamera, pickImageFromLibrary } from '../actions/process';
import { getBannerId, getInterstitialId } from '../adSelector';
import { APP_CONFIG, AppConfig } from '../constants';
import { TEST_DEVICE_ID } from '../secure';
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

interface OwnState {
  showHint: boolean;
}

class InnerMainScreen extends React.PureComponent<OwnProps & StateProps & DispatchProps, OwnState> {

  public static navigationOptions: NavigationStackScreenOptions = {
    header: null
  };

  public state: OwnState = {
    showHint: true
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
      <SafeAreaView style={styles.container} >
        <StatusBar barStyle="dark-content" />
        <View style={styles.top}>
          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID={getBannerId('main')}
            testDeviceID={TEST_DEVICE_ID}
            didFailToReceiveAdWithError={this.onAdFailedToLoad} />
        </View>
        <View style={styles.main} >
          <TouchableOpacity onPress={this.onSwitchAppMode} style={styles.appSwitch}>
            <MaterialCommunityIcons name={config.logo} size={120} color={config.color} />
            <Text style={[styles.appTitle, { color: config.color }]}>
              {config.title}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom} >
          {
            this.state.showHint &&
            <Text style={[styles.hint, { color: config.color }]}>
              Tap the big icon to try more!
            </Text>
          }
          <Button
            icon="md-camera"
            title="Take A Photo"
            style={[styles.button, { backgroundColor: config.color }]}
            fontSize={18}
            onPress={this.onPickFromCamera} />
          <Button
            icon="md-photos"
            title="Pick From Library"
            style={[styles.button, { backgroundColor: config.color }]}
            fontSize={18}
            onPress={this.onPickFromLibrary} />
        </View>
      </SafeAreaView>
    );
  }

  private onAdFailedToLoad = (_: Error): void => {
    this.props.disableProcess(undefined);
  }

  private checkAvailability = (callback: () => void): void => {
    if (this.props.disabled) {
      Alert.alert('Sorry!', 'Service is not available in your region.');
    } else {
      callback();
    }
  }

  private onPickFromCamera = () => {
    this.checkAvailability(() => this.props.pickImageFromCamera(undefined));
  }

  private onPickFromLibrary = () => {
    this.checkAvailability(() => this.props.pickImageFromLibrary(undefined));
  }

  private checkInterstitial = (callback: () => void): void => {
    if (this.props.totalCalled > 0 && this.props.totalCalled % 3 === 0) {
      AdMobInterstitial.setAdUnitID(getInterstitialId());
      AdMobInterstitial.setTestDeviceID(TEST_DEVICE_ID);
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
  top: {
    flex: 0.2,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  main: {
    flex: 0.35,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  bottom: {
    flex: 0.45,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 20
  },
  appSwitch: {
    alignItems: 'center'
  },
  appTitle: {
    fontSize: 18,
    marginTop: -5
  },
  hint: {
    fontSize: 16,
    marginVertical: 5
  },
  button: {
    alignSelf: 'stretch',
    marginVertical: 5
  },
  version: {
    alignSelf: 'flex-end',
    color: '#a9a9a9',
    fontSize: 12,
    paddingBottom: 5
  }
});
