import * as React from 'react';
import { Text, View, ViewStyle } from 'react-native';

import { VisionResult } from '../types/api';

interface Props {
  vision: VisionResult;
}

export class VisionTag extends React.PureComponent<Props, void> {
  public render(): JSX.Element {
    const { captions, tags } = this.props.vision.description;

    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          opacity: 0.8
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
        >
          {
            tags.map((t: string, i: number) =>
              <Tag
                text={t}
                key={i}
                style={{
                  marginBottom: 1,
                  marginHorizontal: 0.5
                }}
              />)
          }
        </View>
        <View
          style={{
            alignSelf: 'stretch',
            backgroundColor: '#1e90ff',
            paddingHorizontal: 6,
            paddingVertical: 1
          }}
        >
          <Text
            style={{
              color: '#ffffff'
            }}
          >{captions[0].text}</Text>
        </View>
      </View>
    );
  }
}

interface TagProps {
  text: string;
  style?: ViewStyle;
}
class Tag extends React.PureComponent<TagProps, void> {
  public render(): JSX.Element {
    return (
      <View
        style={[
          {
            backgroundColor: '#1e90ff',
            borderRadius: 7,
            paddingHorizontal: 6
          },
          this.props.style
        ]}
      >
        <Text
          style={{
            color: '#ffffff'
          }}
        >
          {this.props.text}
        </Text>
      </View>
    );
  }
}
