import React from 'react';
import { Image, ImageURISource, StyleSheet, View } from 'react-native';
import { FaceResult } from '../api/types';
import { ProcessResult } from '../store';
import { FaceTag } from './FaceTag';
import { VisionTag } from './VisionTag';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  },
  image: {
    flex: 1
  }
});

interface Props {
  style: {};
  source: ImageURISource;
  result?: ProcessResult;
  onLoad?: (() => void);
}

export class TaggedPhoto extends React.PureComponent<Props> {

  private renderResult(): Array<JSX.Element> | JSX.Element | undefined {

    if (this.props.result !== undefined) {

      if (this.props.result.face !== undefined) {
        return this.props.result.face.map((f: FaceResult, i: number) =>
          <FaceTag key={i} face={f} />
        );
      }
      if (this.props.result.vision !== undefined) {
        return (
          <VisionTag vision={this.props.result.vision} />
        );
      }
    }

    return undefined;
  }

  public render(): JSX.Element {
    return (
      <View
        style={[styles.container, this.props.style]}
        collapsable={false} >
        <Image
          style={styles.image}
          source={this.props.source}
          onLoad={this.props.onLoad} />
        {this.renderResult()}
      </View>
    );
  }
}
