import React from 'react';
import { Image, View, ViewStyle } from 'react-native';

import { FaceResult } from '../api/face';
import { FaceTag } from './FaceTag';

interface Props {
  style: ViewStyle;
  imageUri: string;
  faceResults?: Array<FaceResult>;
}

export class TaggedPhoto extends React.PureComponent<Props, void> {
  public render(): JSX.Element {
    return (
      <View
        collapsable={false}
        style={[
          { overflow: 'hidden' },
          this.props.style
        ]}
      >
        <Image
          source={{ uri: this.props.imageUri }}
          style={{ flex: 1 }}
        />
        {
          this.props.faceResults !== undefined ?
            this.props.faceResults.map((f: FaceResult, i: number) =>
              <FaceTag key={i} face={f} />
            )
            : null
        }
      </View>
    );
  }
}
