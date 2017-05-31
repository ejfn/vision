import { ImagePicker } from 'expo';
import React from 'react';
import { Image, View } from 'react-native';
import { NavigationAction, NavigationScreenProp, StackNavigatorScreenOptions } from 'react-navigation';

interface NavState {
  params: {
    image: ImagePicker.ImageInfo;
  };
}

interface Props {
  navigation: NavigationScreenProp<NavState, NavigationAction>;
}

export class ImageView extends React.Component<Props, void> {

  public static navigationOptions: StackNavigatorScreenOptions = {
    title: 'Image'
  };

  public render(): JSX.Element {
    const { image } = this.props.navigation.state.params;

    return (
      <View>
        <Image
          source={{ uri: image.uri }}
          style={{ width: image.width, height: image.height }} />
      </View>
    );
  }
}
