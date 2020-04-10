import { AdMobBanner } from 'expo-ads-admob';
import React, {
  RefObject, useEffect, Dispatch, useRef,
} from 'react';
import {
  ActionSheetIOS,
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { describePhoto, detectFace } from '../actions/process';
import { getBannerId } from '../adSelector';
import {
  AppMode, AppState, ProcessState,
} from '../store';
import Button from './Button';
import TaggedPhoto from './TaggedPhoto';
import { usePrevious } from '../utils/hooks';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  main: {
    flex: 0.9,
    justifyContent: 'center',
  },
  photo: {
    justifyContent: 'center',
  },
  indicatorContainer: {
    position: 'absolute',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 20,
    opacity: 0.8,
    backgroundColor: '#000000',
  },
  indicatorText: {
    color: '#eeeeee',
    fontSize: 12,
    marginTop: 10,
  },
  shareButton: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    backgroundColor: '#000000',
  },
  banner: {
    flex: 0.1,
    justifyContent: 'flex-end',
  },
});

async function process(
  taggedPhoto: RefObject<any>,
  appMode: AppMode,
  dispach: Dispatch<any>,
): Promise<void> {
  const base64: string = await takeSnapshotAsync(taggedPhoto, {
    format: 'jpg',
    quality: 1,
    result: 'base64',
    height: width,
    width,
    snapshotContentContainer: false,
  });
  switch (appMode) {
    case 'Face':
      dispach(detectFace({ base64 }));
      break;
    case 'Vision':
      dispach(describePhoto({ base64 }));
      break;
    default:
  }
}

async function showShareActionSheet(taggedPhoto: RefObject<any>): Promise<void> {
  const fileToShare: string = await takeSnapshotAsync(taggedPhoto, {
    format: 'jpg',
    quality: 1,
    result: 'data-uri',
    height: width,
    width,
    snapshotContentContainer: false,
  });
  ActionSheetIOS.showShareActionSheetWithOptions(
    {
      url: fileToShare,
    },
    (error: Error): void => {
      Alert.alert('Oops!', error.message);
    },
    (completed: boolean): void => {
      if (completed) {
        // Alert.alert('Done!');
      }
    },
  );
}

export default function PhotoScreen() {
  const navigation = useNavigation();
  const dispach = useDispatch();
  const { appMode, processState } = useSelector((state: AppState) => state);
  const photoRef = useRef(null);

  const onLoad = async (): Promise<void> => {
    if (processState.status === 'ready') {
      setTimeout(
        async () => { await process(photoRef, appMode, dispach); },
        Platform.select({ ios: 10, android: 1000 }),
      );
    }
  };

  const prevProcessState = usePrevious<ProcessState>(processState);
  useEffect(() => {
    if (prevProcessState?.status === 'requesting') {
      if (processState.status === 'error') {
        let message = 'Something went wrong.';
        if (processState.error !== undefined) {
          message = processState.error.message;
        }
        Alert.alert(
          'Oops!',
          message,
          [
            {
              text: 'Cancel',
              onPress: () => navigation.goBack(),
              style: 'cancel',
            },
            {
              text: 'Retry',
              onPress: async () => { await process(photoRef, appMode, dispach); },
            },
          ],
          { cancelable: false },
        );
      } else if (processState.status === 'success' && processState.result !== undefined) {
        if ((appMode === 'Face' && (
          processState.result.face === undefined
          || processState.result.face.length === 0))
        ) {
          Alert.alert(
            'No Face Detected!',
            'Please select a photo with faces and try agagin.',
            [
              {
                text: 'OK',
                onPress: () => navigation.goBack(),
              },
            ],
          );
        }
      }
    }
  }, [processState]);

  const imageSize: number = Math.min(height, width);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.main}>
        {
          processState.image && !processState.image.cancelled
          && (
            <TaggedPhoto
              ref={photoRef}
              source={{ uri: processState.image.uri }}
              result={processState.result}
              onLoad={onLoad}
              style={[styles.photo, { width: imageSize, height: imageSize }]}
            />
          )
        }
        {
          (processState.status === 'requesting'
            || processState.status === 'ready')
          && (
            <View style={styles.indicatorContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.indicatorText}>PROCESSING...</Text>
            </View>
          )
        }
        {
          (processState.status === 'success'
            && Platform.OS === 'ios')
          && (
            <Button
              fontSize={28}
              icon="ios-share"
              onPress={() => showShareActionSheet(photoRef)}
              style={styles.shareButton}
            />
          )
        }
      </View>
      <View style={styles.banner}>
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID={getBannerId(1)}
          testID="EMULATOR"
        />
      </View>
    </SafeAreaView>
  );
}
