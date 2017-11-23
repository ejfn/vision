import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { PixelRatio, Text, View } from 'react-native';

import { FaceAttributes, FaceRectangle, FaceResult } from '../api/types';

const LABEL_WIDTH: number = 40;
const LABEL_HEIGHT: number = 22;

interface Props {
  face: FaceResult;
}

export class FaceTag extends React.PureComponent<Props, {}> {
  public render(): JSX.Element {
    let { faceRectangle } = this.props.face;
    const r: number = PixelRatio.get();
    faceRectangle = {
      top: faceRectangle.top / r,
      left: faceRectangle.left / r,
      width: faceRectangle.width / r,
      height: faceRectangle.height / r
    };
    const { faceAttributes } = this.props.face;
    const color: string = faceAttributes.gender === 'male' ? '#3399ff' : '#ff99ff';
    const labelAtBottom: boolean = faceRectangle.top / r < LABEL_HEIGHT;
    const leftOffset: number = Math.max((LABEL_WIDTH - faceRectangle.width) / 2, 0);

    if (labelAtBottom) {
      return (
        <View
          collapsable={false}
          style={{
            position: 'absolute',
            top: faceRectangle.top,
            left: faceRectangle.left - leftOffset,
            width: Math.max(faceRectangle.width, LABEL_WIDTH),
            height: faceRectangle.height + LABEL_HEIGHT,
            alignItems: 'center'
          }}
        >
          {this.renderBox(faceRectangle, color)}
          {this.renderLabel(faceAttributes, color)}
        </View >
      );
    } else {
      return (
        <View
          collapsable={false}
          style={{
            position: 'absolute',
            top: faceRectangle.top - LABEL_HEIGHT,
            left: faceRectangle.left - leftOffset,
            width: Math.max(faceRectangle.width, LABEL_WIDTH),
            height: faceRectangle.height + LABEL_HEIGHT,
            alignItems: 'center'
          }}
        >
          {this.renderLabel(faceAttributes, color)}
          {this.renderBox(faceRectangle, color)}
        </View >
      );
    }
  }

  private renderBox = (faceRectangle: FaceRectangle, color: string): JSX.Element => {

    return (
      <View
        collapsable={false}
        style={{
          width: faceRectangle.width,
          height: faceRectangle.height,
          borderColor: color,
          borderWidth: 2
        }}
      />
    );
  }

  private renderLabel = (faceAttributes: FaceAttributes, color: string): JSX.Element => {
    return (
      <View
        collapsable={false}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color,
          height: LABEL_HEIGHT,
          width: LABEL_WIDTH
        }}
      >
        <Ionicons
          name={faceAttributes.gender === 'male' ? 'ios-man' : 'ios-woman'}
          color="#eeeeee"
          size={18}
        />
        <Text
          numberOfLines={1}
          style={{
            color: '#eeeeee',
            fontSize: 14,
            marginLeft: 2
          }}
        >
          {Math.round(faceAttributes.age)}
        </Text>
      </View>
    );
  }
}
