import { SimpleLineIcons } from '@expo/vector-icons';
import { ImagePicker } from 'expo';
import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { NavigationScreenProp, StackNavigatorScreenOptions } from 'react-navigation';

import { Button } from './Button';

const COLOR: string = '#4169e1';
const BUTTON_STYLE: ViewStyle = {
  alignSelf: 'stretch',
  marginVertical: 5,
  backgroundColor: COLOR
};

interface Props {
  navigation: NavigationScreenProp<{}, void>;
}

export class MainScreen extends React.PureComponent<Props, void> {

  public static navigationOptions: StackNavigatorScreenOptions = {
    title: 'Face Detect',
    headerBackTitle: 'Back'
  };

  public render(): JSX.Element {
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
          <SimpleLineIcons name="emotsmile" size={100} color={COLOR} />
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
            style={BUTTON_STYLE}
            onPress={this.pickFromCamera}
          />
          <Button
            icon="md-photos"
            title="Pick From Library"
            style={BUTTON_STYLE}
            onPress={this.pickFromLibrary}
          />
          <Text
            style={{
              marginTop: 20,
              marginBottom: 10
            }}
          >Powered by Microsoft Face API</Text>
        </View>
      </View>
    );
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
    this.props.navigation.navigate('Photo', { image });
  }
}
