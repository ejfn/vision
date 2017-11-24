import React from 'react';
import { Image, View } from 'react-native';

import { EmotionResult, FaceResult, VisionResult } from '../api/types';
import { EmotionTag } from './EmotionTag';
import { FaceTag } from './FaceTag';
import { VisionTag } from './VisionTag';

interface Props {
  // tslint:disable-next-line:no-any
  style: any;
  imageUri: string;
  faceResults: Array<FaceResult> | null;
  emotionResults: Array<EmotionResult> | null;
  visionResult: VisionResult | null;
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
          this.props.faceResults != null ?
            this.props.faceResults.map((f: FaceResult, i: number) =>
              <FaceTag key={i} face={f} />
            )
            : null
        }
        {
          this.props.emotionResults != null ?
            this.props.emotionResults.map((e: EmotionResult, i: number) =>
              <EmotionTag key={i} emotion={e} />
            )
            : null
        }
        {
          this.props.visionResult != null ?
            <VisionTag vision={this.props.visionResult} />
            : null
        }
      </View>
    );
  }
}
