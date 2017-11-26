import React from 'react';
import { Image, PixelRatio, View } from 'react-native';

import { EmotionResult, EmotionScores } from '../api/types';

const ICONS: { [key: string]: {} } = {
  // tslint:disable:no-require-imports
  anger: require('../../assets/emotions/anger.png'),
  contempt: require('../../assets/emotions/contempt.png'),
  disgust: require('../../assets/emotions/disgust.png'),
  fear: require('../../assets/emotions/fear.png'),
  happiness: require('../../assets/emotions/happiness.png'),
  neutral: require('../../assets/emotions/neutral.png'),
  sadness: require('../../assets/emotions/sadness.png'),
  surprise: require('../../assets/emotions/surprise.png')
  // tslint:enable:no-require-imports
};

interface Props {
  emotion: EmotionResult;
}

export class EmotionTag extends React.PureComponent<Props, {}> {
  public render(): JSX.Element {
    let { faceRectangle } = this.props.emotion;
    const r: number = PixelRatio.get();
    faceRectangle = {
      top: faceRectangle.top / r,
      left: faceRectangle.left / r,
      width: faceRectangle.width / r,
      height: faceRectangle.height / r
    };

    const emotion: string = this.getEmotionWithMaxScores(this.props.emotion.scores);
    const size: number = Math.min(30, faceRectangle.width - 4, faceRectangle.height - 4);

    return (
      <View
        collapsable={false}
        style={{
          position: 'absolute',
          top: faceRectangle.top,
          left: faceRectangle.left,
          width: faceRectangle.width,
          height: faceRectangle.height,
          borderColor: '#ffff00',
          borderWidth: 2
        }}>
        <Image
          source={ICONS[emotion]}
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

  private getEmotionWithMaxScores = (scores: EmotionScores): string => {
    return Object.keys(scores).reduce(
      (p: string, c: string): string => {
        if (scores[c] > scores[p]) {
          return c;
        } else {
          return p;
        }
      },
      'neutral'
    );
  }
}
