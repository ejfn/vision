import { AdMobBanner, takeSnapshotAsync } from 'expo';
import React from 'react';
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
  View
} from 'react-native';
import {
  NavigationAction,
  NavigationScreenConfigProps,
  NavigationScreenProp,
  NavigationStackScreenOptions
} from 'react-navigation';
import { connect, MapStateToProps } from 'react-redux';

import { describePhoto, detectFace, recognizeEmotion } from '../actions/process';
import { getBannerId, getTestDeviceIds } from '../adSelector';
import { AppMode, AppState, NetworkState, ProcessState } from '../store';
import { Button } from './Button';
import { TaggedPhoto } from './TaggedPhoto';

const { height, width } = Dimensions.get('window');

interface OwnProps {
  navigation: NavigationScreenProp<{}, NavigationAction>;
}

interface StateProps {
  appMode: AppMode;
  network: NetworkState;
  processState: ProcessState;
}

interface DispatchProps {
  detectFace: typeof detectFace;
  recognizeEmotion: typeof recognizeEmotion;
  describePhoto: typeof describePhoto;
}

type Props = OwnProps & StateProps & DispatchProps;

class InnerPhotoScreen extends React.PureComponent<Props> {

  public static navigationOptions = (props: NavigationScreenConfigProps): NavigationStackScreenOptions => {
    return {
      title: `${props.navigation.state.params.title}`
    };
  }

  private onLoad = async (): Promise<void> => {
    if (this.props.processState.status === 'ready') {
      setTimeout(async () => this.process(), 1000);
      //await this.process();
    }
  }

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.processState.status === 'requesting') {
      if (this.props.processState.status === 'error') {
        let message = 'Something went wrong.';
        if (this.props.processState.error != null) {
          message = this.props.processState.error.message;
        }
        Alert.alert(
          'Oops!',
          message,
          [
            {
              text: 'Cancel',
              onPress: () => this.props.navigation.goBack(),
              style: 'cancel'
            },
            {
              text: 'Retry',
              onPress: async () => { await this.process(); }
            }
          ],
          { cancelable: false }
        );
      } else if (this.props.processState.status === 'success' && this.props.processState.result != null) {
        if ((this.props.appMode === 'Face' && (
          this.props.processState.result.face == null ||
          this.props.processState.result.face.length === 0)) ||
          (this.props.appMode === 'Emotion' && (
            this.props.processState.result.emotion == null ||
            this.props.processState.result.emotion.length === 0))
        ) {
          Alert.alert(
            'No Face Detected!',
            'Please select a photo with faces and try agagin.',
            [
              {
                text: 'OK',
                onPress: () => this.props.navigation.goBack()
              }
            ]
          );
        }
      }
    }
  }

  public render(): JSX.Element {

    const imageSize: number = Math.min(height, width);

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <View style={styles.main}>
          {
            this.props.processState.image != null ?
              <TaggedPhoto
                ref="image"
                source={{ uri: this.props.processState.image.uri }}
                result={this.props.processState.result}
                onLoad={this.onLoad}
                style={[styles.photo, { width: imageSize, height: imageSize }]}
              /> : null
          }
          {
            (this.props.processState.status === 'requesting' ||
              this.props.processState.status === 'ready') ?
              <View style={styles.indicatorContainer} >
                <ActivityIndicator size="large" />
                <Text style={styles.indicatorText}>PROCESSING...</Text>
              </View> : null
          }
          {
            this.props.processState.status === 'success' && Platform.OS === 'ios' ?
              <Button
                fontSize={28}
                icon="ios-share-outline"
                onPress={this.showShareActionSheet}
                style={styles.shareButton} />
              : null
          }
        </View>
        <View style={styles.banner}>
          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID={getBannerId(1)}
            testDeviceID={getTestDeviceIds()[0] || undefined} />
        </View>
      </SafeAreaView>
    );
  }

  private process = async (): Promise<void> => {
    // tslint:disable-next-line:no-any
    const base64: string = await takeSnapshotAsync(this.refs.image as any, {
      format: 'jpeg',
      quality: 1,
      result: 'base64',
      height: width,
      width
    });
    switch (this.props.appMode) {
      case 'Face':
        this.props.detectFace({ base64 });
        break;
      case 'Emotion':
        this.props.recognizeEmotion({ base64 });
        break;
      case 'Vision':
        this.props.describePhoto({ base64 });
        break;
      default:
        return;
    }
  }

  private showShareActionSheet = async (): Promise<void> => {
    // tslint:disable-next-line:no-any
    const fileToShare: string = await takeSnapshotAsync(this.refs.image as any, {
      format: 'jpeg',
      quality: 1,
      result: 'data-uri',
      height: width,
      width: width
    });
    ActionSheetIOS.showShareActionSheetWithOptions(
      {
        url: fileToShare
      },
      (error: Error): void => {
        Alert.alert('Oops!', error.message);
      },
      (completed: boolean, _: string): void => {
        if (completed) {
          Alert.alert('Succeed!');
        }
      }
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (state: AppState) => {
  return {
    appMode: state.appMode,
    network: state.network,
    processState: state.processState
  };
};

// tslint:disable-next-line:variable-name
export const PhotoScreen = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps, {
    detectFace,
    recognizeEmotion,
    describePhoto
  })(InnerPhotoScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  main: {
    flex: 0.9,
    justifyContent: 'center'
  },
  photo: {
    justifyContent: 'center'
  },
  indicatorContainer: {
    position: 'absolute',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 20,
    opacity: 0.8,
    backgroundColor: '#000000'
  },
  indicatorText: {
    color: '#eeeeee',
    fontSize: 12,
    marginTop: 10
  },
  shareButton: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    backgroundColor: '#000000'
  },
  banner: {
    flex: 0.1,
    justifyContent: 'flex-end'
  }
});
