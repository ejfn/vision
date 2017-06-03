import { ImagePicker } from 'expo';
import { Button, Icon, Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { NavigationScreenProp, StackNavigatorScreenOptions } from 'react-navigation';

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
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingHorizontal: 20
        }}>
        <Button
          block iconLeft
          onPress={this.pickFromCamera}
          style={{
            marginVertical: 5
          }}>
          <Icon name="camera" />
          <Text>Take a Photo</Text>
        </Button>
        <Button block iconLeft
          onPress={this.pickFromLibrary}
          style={{
            marginVertical: 5,
            marginBottom: 50
          }}>
          <Icon name="image" />
          <Text>Pick from Library</Text>
        </Button>
        <Text style={{
          marginBottom: 20
        }}>Powered by Microsoft Computer Vision API</Text>
      </View>
    );
  }

  private pickFromCamera = async (): Promise<void> => {
    const result: ImagePicker.ImageResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4]
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
