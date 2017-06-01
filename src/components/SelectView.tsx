import { ImagePicker } from 'expo';
import { Button, Icon, Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { NavigationScreenProp, StackNavigatorScreenOptions } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<{}, void>;
}

export class SelectView extends React.PureComponent<Props, void> {

  public static navigationOptions: StackNavigatorScreenOptions = {
    title: 'Select'
  };

  public render(): JSX.Element {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 10,
        paddingBottom: 30
      }}>
        <Button block iconLeft onPress={this.pickFromCamera}>
          <Icon name="camera" />
          <Text>Take a Photo</Text>
        </Button>
        <View style={{
          height: 10
        }} />
        <Button block iconLeft onPress={this.pickFromLibrary}>
          <Icon name="image" />
          <Text>Pick from Library</Text>
        </Button>
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
      aspect: [4, 4]
    });

    if (!result.cancelled) {
      this.imageSelected(result);
    }
  }

  private imageSelected = (image: ImagePicker.ImageInfo): void => {
    this.props.navigation.navigate('Photo', { image });
  }
}
