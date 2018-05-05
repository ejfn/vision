import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { AdMobBanner, AdMobInterstitial } from 'expo';
import React from 'react';
import {
  Alert,
  Animated,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  NavigationInjectedProps,
  NavigationStackScreenOptions,
  withNavigation
} from 'react-navigation';
import { connect, MapStateToProps } from 'react-redux';
import { switchAppMode } from '../actions/appMode';
import { adReceived } from '../actions/network';
import { pickImageFromCamera, pickImageFromLibrary } from '../actions/process';
import { getBannerId, getInterstitialId } from '../adSelector';
import { CONFIG } from '../config';
import { APP_CONFIG, AppConfig, DECORATIONS } from '../constants';
import { AppMode, AppState, NetworkState, ProcessState } from '../store';
import { Button } from './Button';

interface OwnProps {
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

type Props = OwnProps & StateProps & DispatchProps & NavigationInjectedProps;

interface State {
  showPointer: boolean;
}

class InnerMainScreen extends React.PureComponent<Props, State> {

  private springValue: Animated.Value = new Animated.Value(1);

  public static navigationOptions: NavigationStackScreenOptions = {
    header: null
  };

  public state: State = {
    showPointer: false
  };

  public spring(): void {
    this.setState((s: State) => ({ ...s, showPointer: true }));
    this.springValue.setValue(-45);
    Animated.spring(
      this.springValue,
      {
        toValue: -15,
        friction: 3,
        tension: 40
      }
    ).start(() => {
      this.setState((s: State) => ({ ...s, showPointer: false }));
    });
  }

  public componentDidMount(): void {
    setInterval(() => { this.spring(); }, 5000);
  }

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.processState.status === 'picking' && this.props.processState.status === 'ready') {
      // tslint:disable-next-line:no-floating-promises
      this.showInterstitialAsync(() => {
        const title = APP_CONFIG[this.props.appMode].title;
        this.props.navigation.navigate('Photo', { title });
      });
    }
  }

  public render(): JSX.Element {
    const config: AppConfig = APP_CONFIG[this.props.appMode];
    return (
      <ImageBackground
        style={styles.background}
        source={DECORATIONS.spring}
        resizeMode="cover">
        <SafeAreaView style={styles.container} >
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <View style={styles.top} >
          </View>
          <View style={styles.main}>
            {this.state.showPointer &&
              <Animated.View style={[styles.pointer, { top: this.springValue }]} >
                <FontAwesome name="hand-o-down" size={40} color={config.color} />
              </Animated.View>
            }
            <TouchableOpacity activeOpacity={0.5} onPress={this.onSwitchAppMode} style={styles.appSwitch}>
              <MaterialCommunityIcons name={config.logo} size={100} color={config.color} />
              <Text style={[styles.appTitle, { color: config.color }]}>
                {config.title}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom} >
            <Button
              icon="md-camera"
              title="Take A Photo"
              style={[styles.button, { backgroundColor: config.color }]}
              fontSize={16}
              onPress={this.onPickFromCamera} />
            <Button
              icon="md-photos"
              title="Pick From Library"
              style={[styles.button, { backgroundColor: config.color }]}
              fontSize={16}
              onPress={this.onPickFromLibrary} />
            {
              CONFIG.showAd &&
              <AdMobBanner
                bannerSize="smartBannerPortrait"
                adUnitID={getBannerId(0)}
                testDeviceID="EMULATOR"
                adViewDidReceiveAd={this.onAdReceived} />
            }
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  private onSwitchAppMode = () => {
    this.props.switchAppMode(undefined);
  }

  private onAdReceived = (): void => {
    this.props.adReceived(undefined);
  }

  private checkAvailability = (callback: () => void): void => {
    if (!this.props.network.isConnected) {
      Alert.alert('No Network Connection!', 'You\'re not connected to the internet. Check your connection and try again.');
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

  private showInterstitialAsync = async (callback: () => void): Promise<void> => {
    if (this.props.totalCalled > 0 &&
      this.props.totalCalled % CONFIG.showInterstitialCalls === 0) {
      AdMobInterstitial.setAdUnitID(getInterstitialId(0));
      AdMobInterstitial.setTestDeviceID('EMULATOR');
      AdMobInterstitial.addEventListener(
        'interstitialDidClose',
        callback,
        { once: true }
      );
      await AdMobInterstitial.requestAdAsync();
      await AdMobInterstitial.showAdAsync();
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
  })(withNavigation(InnerMainScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
  background: {
    flex: 1
  },
  top: {
    flex: 0.3,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  main: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pointer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0
  },
  bottom: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  appSwitch: {
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  appTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: -5
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 10
  },
  version: {
    alignSelf: 'flex-end',
    color: '#a9a9a9',
    fontSize: 12,
    paddingRight: 5,
    paddingBottom: 5
  }
});
