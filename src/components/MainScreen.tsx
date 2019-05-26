import { MaterialCommunityIcons } from '@expo/vector-icons';
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

// #region Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
  background: {
    flex: 1
  },
  top: {
    flex: 0.2,
  },
  main: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  appSwitch: {
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  appTitle: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 10,
    height: 50
  },
  version: {
    alignSelf: 'flex-end',
    color: '#a9a9a9',
    fontSize: 12,
    paddingRight: 5,
    paddingBottom: 5
  }
});
// #endregion

// tslint:disable-next-line: no-empty-interface
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

const modes: Array<AppMode> = ['Face', 'Vision'];

class InnerMainScreen extends React.PureComponent<Props, State> {

  private readonly springValue: Animated.Value = new Animated.Value(1);

  public static navigationOptions: NavigationStackScreenOptions = {
    // tslint:disable-next-line: no-null-keyword
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
      })
      .start(() => {
        this.setState((s: State) => ({ ...s, showPointer: false }));
      });
  }

  public componentDidMount(): void {
    setInterval(() => { this.spring(); }, 5000);
  }

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.processState.status === 'picking' && this.props.processState.status === 'ready') {
      // tslint:disable-next-line: no-floating-promises
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
          <View style={styles.top} />
          <View style={styles.main}>
            {
              modes.map((m: AppMode) => {
                const c = APP_CONFIG[m];
                if (this.props.appMode === m) {
                  return <MaterialCommunityIcons key={m} name={c.logo} size={120} color={c.color} />;
                }
                const onPress = () => {
                  this.onSwitchAppMode(m);
                };

                return (
                  // tslint:disable-next-line: react-this-binding-issue
                  <TouchableOpacity key={m} activeOpacity={0.5} onPress={onPress} style={styles.appSwitch}>
                    <MaterialCommunityIcons key={m} name={c.logo} size={80} color={c.color} style={{ opacity: 0.5 }} />
                  </TouchableOpacity>
                );
              })
            }
          </View>
          <View style={styles.bottom} >
            <Text style={[styles.appTitle, { color: config.color }]}>
              {config.title}
            </Text>
            <Button
              icon="md-camera"
              title="Take A Photo"
              style={[styles.button, { backgroundColor: config.color }]}
              fontSize={20}
              onPress={this.onPickFromCamera} />
            <Button
              icon="md-photos"
              title="Pick From Library"
              style={[styles.button, { backgroundColor: config.color }]}
              fontSize={20}
              onPress={this.onPickFromLibrary} />
            <AdMobBanner
              bannerSize="smartBannerPortrait"
              adUnitID={getBannerId(0)}
              testDeviceID="EMULATOR"
              adViewDidReceiveAd={this.onAdReceived} />
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  private readonly onSwitchAppMode = (mode: AppMode) => {
    this.props.switchAppMode(mode);
  }

  private readonly onAdReceived = (): void => {
    this.props.adReceived(undefined);
  }

  private readonly checkAvailability = (callback: () => void): void => {
    if (!this.props.network.isConnected) {
      Alert.alert('No Network Connection!', 'You\'re not connected to the internet. Check your connection and try again.');
    } else {
      callback();
    }
  }

  private readonly onPickFromCamera = () => {
    this.checkAvailability(() => this.props.pickImageFromCamera(undefined));
  }

  private readonly onPickFromLibrary = () => {
    this.checkAvailability(() => this.props.pickImageFromLibrary(undefined));
  }

  private readonly showInterstitialAsync = async (callback: () => void): Promise<void> => {
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
