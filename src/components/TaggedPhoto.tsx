import React, { RefObject, forwardRef } from 'react';
import {
  Image, ImageURISource, StyleSheet, View,
} from 'react-native';
import { FaceResult } from '../api/types';
import { ProcessResult } from '../store';
import FaceTag from './FaceTag';
import VisionTag from './VisionTag';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
});

interface Props {
  style: {};
  source: ImageURISource;
  result?: ProcessResult;
  onLoad?: (() => void);
}

const renderResult = (props: Props): Array<JSX.Element> | JSX.Element | undefined => {
  if (props.result !== undefined) {
    if (props.result.face !== undefined) {
      return props.result.face
        .map((f: FaceResult, i: number) => (<FaceTag key={i.toString()} face={f} />));
    }
    if (props.result.vision !== undefined) {
      return (
        <VisionTag vision={props.result.vision} />
      );
    }
  }
  return undefined;
};

const TaggedPhoto = forwardRef((props: Props, ref: RefObject<any>) => (
  <View
    style={[styles.container, props.style]}
    collapsable={false}
  >
    <Image
      ref={ref}
      style={styles.image}
      source={props.source}
      onLoad={props.onLoad}
    />
    {renderResult(props)}
  </View>
));

export default TaggedPhoto;
