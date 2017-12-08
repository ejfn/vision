import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AdMobBanner, AdMobInterstitial } from 'expo';
import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { NavigationScreenProp, NavigationStackScreenOptions } from 'react-navigation';
import { connect, MapStateToProps } from 'react-redux';

import { switchAppMode } from '../actions/appMode';
import { adReceived } from '../actions/network';
import { pickImageFromCamera, pickImageFromLibrary } from '../actions/process';
import { getBannerId, getInterstitialId, getTestDeviceIds } from '../adSelector';
import { extra } from '../config';
import { APP_CONFIG, AppConfig, DECORATIONS } from '../constants';
import { AppMode, AppState, NetworkState, ProcessState } from '../store';
import { Button } from './Button';

const { width } = Dimensions.get('window');

interface OwnProps {
  navigation: NavigationScreenProp<{}, void>;
}

interface StateProps {
  appMode: AppMode;
  processState: ProcessState;
  network: NetworkState;
  totalCalled: number;
}

interface DispatchProps {
  switchAppMode: typeof switchAppMode;
  adReceived: typeof adReceived;
  pickImageFromCamera: typeof pickImageFromCamera;
  pickImageFromLibrary: typeof pickImageFromLibrary;
}

type Props = OwnProps & StateProps & DispatchProps;

interface State {
  showHint: boolean;
}

class InnerMainScreen extends React.PureComponent<OwnProps & StateProps & DispatchProps, State> {

  private timeoutHandle: number | null = null;

  public static navigationOptions: NavigationStackScreenOptions = {
    header: null
  };

  public state: State = {
    showHint: false
  };

  public componentDidMount(): void {
    this.resetHint();
  }

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.processState.status === 'picking' && this.props.processState.status === 'ready') {
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
            adUnitID={getBannerId(0)}
            testDeviceID={getTestDeviceIds()[0] || undefined}
            adViewDidReceiveAd={this.onAdReceived} />
          <View style={{ flex: 1 }}>
            <Image source={DECORATIONS.christmasBanner}
              style={styles.xmas}
              resizeMode="stretch" />
          </View>
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
              Hint: Tap the big icon to try more.
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
          <Text style={styles.version}>{extra.semver}</Text>
        </View>
      </SafeAreaView >
    );
  }

  private resetHint(): void {
    if (this.timeoutHandle != null) {
      this.setState((state: State) => {
        return { ...state, showHint: false };
      });
      clearTimeout(this.timeoutHandle);
    }
    this.timeoutHandle = setTimeout(
      () => {
        this.setState((state: State) => {
          return { ...state, showHint: true };
        });
      },
      extra.showHintIdleSeconds * 1000);
  }

  private onSwitchAppMode = () => {
    this.resetHint();
    this.props.switchAppMode(undefined);
  }

  private onAdReceived = (): void => {
    this.props.adReceived(undefined);
  }

  private checkAvailability = (callback: () => void): void => {
    if (!this.props.network.isConnected) {
      Alert.alert('No Connectivity!', 'Please check you internet connectivity.');
    } else if (!this.props.network.adReceived &&
      this.props.processState.totalCalled >= extra.limitedAccessCalls) {
      Alert.alert('Limited Access!', 'Service is currently limited on your device. Ad blocked?');
    } else {
      callback();
    }
  }

  private onPickFromCamera = () => {
    this.resetHint();
    this.checkAvailability(() => this.props.pickImageFromCamera(undefined));
  }

  private onPickFromLibrary = () => {
    this.resetHint();
    this.checkAvailability(() => this.props.pickImageFromLibrary(undefined));
  }

  private checkInterstitial = (callback: () => void): void => {
    if (this.props.totalCalled > 0 &&
      this.props.totalCalled % extra.showInterstitialCalls === 0) {
      AdMobInterstitial.setAdUnitID(getInterstitialId(0));
      getTestDeviceIds().forEach(i => AdMobInterstitial.setTestDeviceID(i));
      AdMobInterstitial.addEventListener(
        'interstitialDidClose',
        callback,
        { once: true }
      );
      AdMobInterstitial.requestAd(() => AdMobInterstitial.showAd());
    } else {
      callback();
    }
  }
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (state: AppState) => {
  return {
    appMode: state.appMode,
    processState: state.processState,
    network: state.network,
    totalCalled: state.processState.totalCalled
  };
};

// tslint:disable-next-line:variable-name
export const MainScreen = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps, {
    switchAppMode,
    adReceived,
    pickImageFromCamera,
    pickImageFromLibrary
  })(InnerMainScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  top: {
    flex: 0.3,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  main: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottom: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  appSwitch: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  appTitle: {
    fontSize: 18,
    marginTop: -5
  },
  hint: {
    fontSize: 14,
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
    paddingRight: 5,
    paddingBottom: 5
  },
  xmas: {
    width: width,
    height: width / 1.49
  }
});
