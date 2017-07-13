import React from 'react';
import { Image, View, ViewStyle } from 'react-native';

import { EmotionResult, FaceResult, VisionResult } from '../types/api';
import { EmotionTag } from './EmotionTag';
import { FaceTag } from './FaceTag';
import { VisionTag } from './VisionTag';

interface Props {
  style: ViewStyle;
  imageUri: string;
  faceResults?: Array<FaceResult>;
  emotionResults?: Array<EmotionResult>;
  visionResult?: VisionResult;
}

export class TaggedPhoto extends React.PureComponent<Props, {}> {
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
        {
          this.props.emotionResults !== undefined ?
            this.props.emotionResults.map((e: EmotionResult, i: number) =>
              <EmotionTag key={i} emotion={e} />
            )
            : null
        }
        {
          this.props.visionResult !== undefined ?
            <VisionTag vision={this.props.visionResult} />
            : null
        }
      </View>
    );
  }
}
