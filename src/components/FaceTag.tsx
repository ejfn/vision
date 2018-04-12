import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, PixelRatio, Text, View } from 'react-native';
import { Emotion, FaceAttributes, FaceRectangle, FaceResult } from '../api/types';
import { EMOJI_ICONS } from '../constants';

const LABEL_WIDTH: number = 40;
const LABEL_HEIGHT: number = 22;

interface Props {
  face: FaceResult;
}

export class FaceTag extends React.PureComponent<Props> {
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
    const emotion: string = this.getEmotionWithMaxScores(this.props.face.faceAttributes.emotion);
    const size: number = Math.min(30, faceRectangle.width - 4, faceRectangle.height - 4);

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
          }}>
          {this.renderBox(faceRectangle, color, emotion, size)}
          {this.renderLabel(faceAttributes, color)}
        </View>
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
          }} >
          {this.renderLabel(faceAttributes, color)}
          {this.renderBox(faceRectangle, color, emotion, size)}
        </View>
      );
    }
  }

  private renderBox = (faceRectangle: FaceRectangle, color: string, emotion: string, size: number): JSX.Element => {

    return (
      <View
        collapsable={false}
        style={{
          width: faceRectangle.width,
          height: faceRectangle.height,
          borderColor: color,
          borderWidth: 2
        }} >
        <Image
          source={EMOJI_ICONS[emotion]}
          style={{
            opacity: 0.8,
            position: 'absolute',
            width: size,
            height: size,
            bottom: 0,
            right: 0
          }} />
      </View>
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
        }}>
        <Ionicons
          name={faceAttributes.gender === 'male' ? 'ios-man' : 'ios-woman'}
          color="#eeeeee"
          size={18} />
        <Text
          numberOfLines={1}
          style={{
            color: '#eeeeee',
            fontSize: 14,
            marginLeft: 2
          }} >
          {Math.round(faceAttributes.age)}
        </Text>
      </View>
    );
  }

  private getEmotionWithMaxScores = (emotion: Record<Emotion, number>): string => {
    return Object.keys(emotion).reduce(
      (p: Emotion, c: Emotion): string => {
        if (emotion[c] > emotion[p]) {
          return c;
        } else {
          return p;
        }
      },
      'neutral'
    );
  }
}
