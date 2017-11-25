import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { EmotionResult, FaceResult } from '../api/types';
import { ProcessResult } from '../store';
import { EmotionTag } from './EmotionTag';
import { FaceTag } from './FaceTag';
import { VisionTag } from './VisionTag';

interface Props {
  style: {};
  imageUri: string;
  result: ProcessResult | null;
}

export class TaggedPhoto extends React.PureComponent<Props, {}> {

  private renderResult(): Array<JSX.Element> | JSX.Element | null {

    if (this.props.result != null) {

      if (this.props.result.face !== undefined) {
        return this.props.result.face.map((f: FaceResult, i: number) =>
          <FaceTag key={i} face={f} />
        );
      }
      if (this.props.result.emotion !== undefined) {
        return this.props.result.emotion.map((e: EmotionResult, i: number) =>
          <EmotionTag key={i} emotion={e} />
        );
      }
      if (this.props.result.vision !== undefined) {
        return (
          <VisionTag vision={this.props.result.vision} />
        );
      }
    }
    return null;
  }

  public render(): JSX.Element {
    return (
      <View
        style={[styles.container, this.props.style]}
        collapsable={false}
      >
        <Image
          style={styles.image}
          source={{ uri: this.props.imageUri }}
        />
        {this.renderResult()}
      </View>
    );
  }
}

// tslint:disable-next-line:no-any
const styles: any = StyleSheet.create({
  container: {
    overflow: 'hidden'
  },
  image: {
    flex: 1
  }
});
