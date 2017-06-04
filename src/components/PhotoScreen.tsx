import { ImagePicker, takeSnapshotAsync } from 'expo';
import React from 'react';
import { ActionSheetIOS, ActivityIndicator, Alert, Dimensions, Platform, Text, View } from 'react-native';
import { NavigationAction, NavigationScreenProp, StackNavigatorScreenOptions } from 'react-navigation';

import { faceDetect, FaceResult } from '../api/face';
import { Button } from './Button';
import { TaggedPhoto } from './TaggedPhoto';

const { height, width } = Dimensions.get('window');

interface NavState {
  params: {
    image: ImagePicker.ImageInfo;
    fileToShare?: string;
  };
}

interface Props {
  navigation: NavigationScreenProp<NavState, NavigationAction>;
}

interface State {
  isRequesting: boolean;
  faceResults?: Array<FaceResult>;
  error?: Error;
}

export class PhotoScreen extends React.PureComponent<Props, State> {

  public static navigationOptions: StackNavigatorScreenOptions = {
    title: 'Face Detect'
  };

  public state: State = {
    isRequesting: false
  };

  public componentDidMount(): void {
    this.setState((state: State) => ({ ...state, isRequesting: true }));
    setTimeout(this.process, 1000);
  }

  public render(): JSX.Element {
    if (this.state.error !== undefined) {
      Alert.alert('Oops!', this.state.error.message, [{
        text: 'OK', onPress: (): void => {
          this.setState((state: State) => ({ ...state, error: undefined }));
        }
      }]);
    }

    const { image } = this.props.navigation.state.params;
    const imageSize: number = Math.min(height, width);

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000'
        }}>
        <View style={{
          flex: 0.9,
          justifyContent: 'center'
        }}>
          <TaggedPhoto
            ref="image"
            imageUri={image.uri}
            faceResults={this.state.faceResults}
            style={{
              width: imageSize,
              height: imageSize,
              justifyContent: 'center'
            }}
          />
          {
            this.state.isRequesting ?
              <View
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  padding: 25,
                  borderRadius: 20,
                  opacity: 0.8,
                  backgroundColor: '#000000'
                }}
              >
                <ActivityIndicator size="large" />
                <Text
                  style={{
                    color: '#eeeeee',
                    fontSize: 12,
                    marginTop: 10
                  }}
                >DETECTING...</Text>
              </View>
              : null
          }
        </View>
        <View
          style={{
            flex: 0.1,
            justifyContent: 'flex-end'
          }}
        >
          {
            this.state.faceResults !== undefined && Platform.OS === 'ios' ?
              <Button
                fontSize={28}
                icon="ios-share-outline"
                onPress={this.showShareActionSheet}
                style={{
                  backgroundColor: '#000000'
                }}
              />
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
    try {
      const response: Array<FaceResult> = await faceDetect(base64);
      this.setState((state: State) => ({ ...state, isRequesting: false, faceResults: response }));
    } catch (e) {
      this.setState((state: State) => ({ ...state, isRequesting: false, error: e }));
    }
  }

  private showShareActionSheet = async (): Promise<void> => {
    // tslint:disable-next-line:no-any
    const fileToShare: string = await takeSnapshotAsync(this.refs.image as any, {
      format: 'jpeg',
      quality: 1,
      result: 'file',
      height: width,
      width
    });
    ActionSheetIOS.showShareActionSheetWithOptions(
      { url: fileToShare },
      (error: Error): void => {
        Alert.alert('Ooops!', error.message);
      },
      (completed: boolean, _: string): void => {
        if (completed) {
          Alert.alert('Shared!');
        }
      }
    );
  }
}
