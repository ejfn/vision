import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImagePicker } from 'expo';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProp, NavigationStackScreenOptions } from 'react-navigation';

import { APP_MODE_EMOTION, APP_MODE_FACE, APP_MODE_VISION } from '../constants';
import { AppMode } from '../types/common';
import { Button } from './Button';

const COLOR: { [key: string]: string } = {
  Face: '#4169e1',
  Emotion: '#ba55d3',
  Vision: '#2e8b57'
};

const LOGO: { [key: string]: string } = {
  Face: 'emoticon',
  Emotion: 'emoticon-devil',
  Vision: 'tag-text-outline'
};

const TITLE: { [key: string]: string } = {
  Face: 'Face Detection',
  Emotion: 'Emotion Detection',
  Vision: 'Image Tagging'
};

const API: { [key: string]: string } = {
  Face: 'Microsoft Face API',
  Emotion: 'Microsoft Emotion API',
  Vision: 'Microsoft Computer Vision API'
};

const MODES: Array<AppMode> = [
  APP_MODE_FACE,
  APP_MODE_EMOTION,
  APP_MODE_VISION
];

interface Props {
  navigation: NavigationScreenProp<{}, void>;
}

interface State {
  mode: AppMode;
}

export class MainScreen extends React.PureComponent<Props, State> {

  public static navigationOptions: NavigationStackScreenOptions = {
    title: 'Vision',
    headerBackTitle: 'Back'
  };

  public state: State = {
    mode: MODES[0]
  };

  public render(): JSX.Element {

    const color: string = COLOR[this.state.mode];

    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10
        }}
      >
        <View
          style={{
            flex: 0.5,
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={this.switchMode}
            style={{
              alignItems: 'center'
            }}
          >
            <MaterialCommunityIcons name={LOGO[this.state.mode]} size={100} color={color} />
            <Text style={{ fontSize: 20, color: color }}>{TITLE[this.state.mode]}</Text>
            <Text style={{ color: color }}>Tap me to switch mode!</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <Button
            icon="md-camera"
            title="Take A Photo"
            style={{
              alignSelf: 'stretch',
              marginVertical: 5,
              backgroundColor: color
            }}
            onPress={this.pickFromCamera}
          />
          <Button
            icon="md-photos"
            title="Pick From Library"
            style={{
              alignSelf: 'stretch',
              marginVertical: 5,
              backgroundColor: color
            }}
            onPress={this.pickFromLibrary}
          />
          <Text
            style={{
              color: color,
              marginVertical: 10
            }}
          >Powered by {API[this.state.mode]}</Text>
        </View>
      </View>
    );
  }

  private switchMode = (): void => {
    const currentIndex: number = MODES.indexOf(this.state.mode);
    const nextIndex: number = currentIndex < MODES.length - 1 ? currentIndex + 1 : 0;
    const nextMode: AppMode = MODES[nextIndex];
    this.setState((state: State) => ({ ...state, mode: nextMode }));
  }

  private pickFromCamera = async (): Promise<void> => {
    const result: ImagePicker.ImageResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });

    if (!result.cancelled) {
      this.imageSelected(result);
    }
  }

  private pickFromLibrary = async (): Promise<void> => {
    const result: ImagePicker.ImageResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });

    if (!result.cancelled) {
      this.imageSelected(result);
    }
  }

  private imageSelected = (image: ImagePicker.ImageInfo): void => {
    this.props.navigation.navigate('Photo', { mode: this.state.mode, image });
  }
}
