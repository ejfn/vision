import { ImagePicker, takeSnapshotAsync } from 'expo';
import { Spinner } from 'native-base';
import React from 'react';
import { Alert, Dimensions, Image, ScrollView, Text } from 'react-native';
import { NavigationAction, NavigationScreenProp, StackNavigatorScreenOptions } from 'react-navigation';

import { faceDetect, FaceResult } from '../api/face';

const { height, width } = Dimensions.get('window');

interface NavState {
  params: {
    image: ImagePicker.ImageInfo;
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

export class PhotoView extends React.PureComponent<Props, State> {

  public static navigationOptions: StackNavigatorScreenOptions = {
    title: 'Photo'
  };

  public state: State = {
    isRequesting: false
  };

  public componentDidMount(): void {
    this.setState((state: State) => ({ ...state, isRequesting: true }));
    setTimeout(() => { this.process(); }, 1000);
  }

  public render(): JSX.Element {
    if (this.state.error !== undefined) {
      Alert.alert('Ooops!', this.state.error.message, [{
        text: 'OK', onPress: (): void => {
          this.setState((state: State) => ({ ...state, error: undefined }));
        }
      }]);
    }

    const { image } = this.props.navigation.state.params;

    const imageSize: number = Math.min(height, width);

    return (
      <ScrollView style={{ backgroundColor: '#000' }}>
        <Image ref="image"
          source={{ uri: image.uri }}
          style={{ width: imageSize, height: imageSize }} />
        {
          this.state.isRequesting ? <Spinner color="#ccc" /> : null
        }
        {
          this.state.faceResults !== undefined ?
            <Text style={{ flex: 1, color: '#eee' }}>{JSON.stringify(this.state.faceResults)}</Text>
            : null
        }
      </ScrollView>
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
}
