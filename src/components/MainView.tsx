import { ImagePicker } from 'expo';
import { Button, Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { NavigationScreenProp, StackNavigatorScreenOptions } from 'react-navigation';


interface Props {
  navigation: NavigationScreenProp<{}, void>;
}

export class MainView extends React.PureComponent<Props, void> {

  public static navigationOptions: StackNavigatorScreenOptions = {
    title: 'Main'
  };

  public render(): JSX.Element {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <Button style={{ alignSelf: 'center' }} onPress={this.pickFromCamera}>
          <Text>Camera</Text>
        </Button>
        <Button style={{ alignSelf: 'center' }} onPress={this.pickFromLibrary}>
          <Text>Photo Library</Text>
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
    this.props.navigation.navigate('ImageView', { image });
  }
}
