import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AdMobBanner } from 'expo-ads-admob';
import React, {
  useEffect,
} from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { switchAppMode } from '../actions/appMode';
import { adReceived } from '../actions/network';
import { pickImageFromCamera, pickImageFromLibrary } from '../actions/process';
import { getBannerId } from '../adSelector';
import { APP_CONFIG, AppConfig } from '../constants';
import {
  AppMode, AppState, ProcessState,
} from '../store';
import Button from './Button';
import { usePrevious } from '../utils/hooks';

// #region Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  background: {
    flex: 1,
  },
  top: {
    flex: 0.2,
  },
  main: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  appSwitch: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  appTitle: {
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 10,
    height: 50,
  },
  version: {
    alignSelf: 'flex-end',
    color: '#a9a9a9',
    fontSize: 12,
    paddingRight: 5,
    paddingBottom: 5,
  },
});
// #endregion

const modes: Array<AppMode> = ['Face', 'Vision'];

export default function MainScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { appMode, processState, network } = useSelector((state: AppState) => state);

  const prevProcessState = usePrevious<ProcessState>(processState);
  useEffect(() => {
    if (prevProcessState?.status === 'picking' && processState.status === 'ready') {
      const { title } = APP_CONFIG[appMode];
      navigation.navigate('Photo', { title });
    }
  });

  const checkAvailability = (callback: () => void): void => {
    if (!network.isConnected) {
      Alert.alert('No Network Connection!', 'You\'re not connected to the internet. Check your connection and try again.');
    } else {
      callback();
    }
  };

  const config: AppConfig = APP_CONFIG[appMode];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.top} />
      <View style={styles.main}>
        {
          modes.map((m: AppMode) => {
            const c = APP_CONFIG[m];
            if (appMode === m) {
              return <MaterialCommunityIcons key={m} name={c.logo} size={120} color={c.color} />;
            }
            return (
              <TouchableOpacity
                key={m}
                activeOpacity={0.5}
                onPress={() => dispatch(switchAppMode(m))}
                style={styles.appSwitch}
              >
                <MaterialCommunityIcons
                  key={m}
                  name={c.logo}
                  size={80}
                  color={c.color}
                  style={{ opacity: 0.5 }}
                />
              </TouchableOpacity>
            );
          })
        }
      </View>
      <View style={styles.bottom}>
        <Text style={[styles.appTitle, { color: config.color }]}>
          {config.title}
        </Text>
        <Button
          icon="md-camera"
          title="Take A Photo"
          style={[styles.button, { backgroundColor: config.color }]}
          fontSize={20}
          onPress={() => checkAvailability(() => dispatch(pickImageFromCamera(undefined)))}
        />
        <Button
          icon="md-photos"
          title="Pick From Library"
          style={[styles.button, { backgroundColor: config.color }]}
          fontSize={20}
          onPress={() => checkAvailability(() => dispatch(pickImageFromLibrary(undefined)))}
        />
        <AdMobBanner
          style={{ paddingTop: 40 }}
          bannerSize="smartBannerPortrait"
          adUnitID={getBannerId(0)}
          //  testDeviceID="EMULATOR"
          onAdViewDidReceiveAd={() => dispatch(adReceived(undefined))}
        />
      </View>
    </SafeAreaView>
  );
}
