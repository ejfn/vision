import { Icon, Text, View } from 'native-base';
import React from 'react';
import { PixelRatio } from 'react-native';

import { FaceResult } from '../api/face';

interface Props {
  face: FaceResult;
}

export class FaceTag extends React.PureComponent<Props, void> {
  public render(): JSX.Element {
    const { faceRectangle, faceAttributes } = this.props.face;
    const r: number = PixelRatio.get();
    const color: string = faceAttributes.gender === 'male' ? '#3399ff' : '#ff99ff';
    const atBottom: boolean = faceRectangle.top / r < 22;

    return (
      <View style={{
        position: 'absolute',
        top: faceRectangle.top / r,
        left: faceRectangle.left / r,
        width: faceRectangle.width / r,
        height: faceRectangle.height / r,
        borderColor: color,
        borderWidth: 2
      }}>
        <View style={{
          flex: 1,
          position: 'absolute',
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'flex-end',
          backgroundColor: color,
          height: 20,
          top: atBottom ? undefined : -22,
          bottom: atBottom ? -22 : undefined,
          paddingLeft: 5,
          paddingRight: 5
        }}>
          <Icon
            name={faceAttributes.gender === 'male' ? 'man' : 'woman'}
            style={{ color: '#fff', fontSize: 18, padding: 0 }}
          />
          <Text style={{ color: '#fff', fontSize: 14, marginLeft: 2, padding: 0 }}>
            {Math.round(faceAttributes.age)}
          </Text>
        </View>
      </View >
    );
  }
}
