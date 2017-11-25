import { AdMobBanner, takeSnapshotAsync } from 'expo';
import React from 'react';
import {
  ActionSheetIOS,
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
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
import { getBannerId } from '../adSelector';
import { TEST_DEVICE } from '../config';
import { AppMode, AppState, ProcessState } from '../store';
import { Button } from './Button';
import { TaggedPhoto } from './TaggedPhoto';

const { height, width } = Dimensions.get('window');

interface OwnProps {
  navigation: NavigationScreenProp<{}, NavigationAction>;
}

interface StateProps {
  appMode: AppMode;
  processState: ProcessState;
}

interface DispatchProps {
  detectFace: typeof detectFace;
  recognizeEmotion: typeof recognizeEmotion;
  describePhoto: typeof describePhoto;
}

class InnerPhotoScreen extends React.PureComponent<OwnProps & StateProps & DispatchProps> {

  public static navigationOptions = (props: NavigationScreenConfigProps): NavigationStackScreenOptions => {
    return {
      title: `${props.navigation.state.params.title}`
    };
  }

  public componentDidMount(): void {
    if (this.props.processState.status === 'ready') {
      setTimeout(this.process, 500);
    }
  }

  public render(): JSX.Element {
    if (this.props.processState.error != null) {
      Alert.alert('Opps, Something went wrong!', this.props.processState.error.message, [{
        text: 'OK', onPress: (): void => {
          //this.setState((state: State) => ({ ...state, error: undefined }));
        }
      }]);
    }

    const imageSize: number = Math.min(height, width);

    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID={getBannerId(1)}
            testDeviceID={TEST_DEVICE} />
        </View>
        <View style={styles.main}>
          {
            this.props.processState.image != null ?
              <TaggedPhoto
                ref="image"
                imageUri={this.props.processState.image.uri}
                result={this.props.processState.result}
                style={[styles.photo, { width: imageSize, height: imageSize }]}
              /> : null
          }
          {
            this.props.processState.status === 'requesting' ?
              <View style={styles.indicatorContainer} >
                <ActivityIndicator size="large" />
                <Text style={styles.indicatorText}>PROCESSING...</Text>
              </View> : null
          }

        </View>
        <View style={styles.bottom}>
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
      </View>
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
          // Alert.alert('Shared!');
        }
      }
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (state: AppState) => {
  return {
    appMode: state.appMode,
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

// tslint:disable-next-line:no-any
const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  banner: {
    flex: 0.1,
    justifyContent: 'flex-start'
  },
  main: {
    flex: 0.8,
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
  bottom: {
    flex: 0.1,
    justifyContent: 'flex-end'
  },
  shareButton: {
    alignSelf: 'center',
    backgroundColor: '#000000'
  }
});
