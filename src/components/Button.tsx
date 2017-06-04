import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';

interface Props {
  icon?: string;
  title?: string;
  fontSize?: number;
  color?: string;
  style?: ViewStyle;
  onPress(): void;
}

export class Button extends React.PureComponent<Props, void> {
  public render(): JSX.Element {
    const fontSize: number = this.props.fontSize !== undefined ? this.props.fontSize : 16;
    const color: string = this.props.color !== undefined ? this.props.color : '#eeeeee';

    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'nowrap',
            alignContent: 'center',
            alignItems: 'center',
            paddingHorizontal: fontSize + 5,
            paddingVertical: fontSize - 5,
            borderRadius: 5,
            backgroundColor: '#4169e1'
          },
          this.props.style
        ]}
      >
        {
          this.props.icon !== undefined ?
            <Ionicons
              name={this.props.icon}
              color={color}
              size={fontSize + 4}
            />
            : null
        }
        {
          this.props.title !== undefined ?
            <Text
              ellipsizeMode="middle"
              style={{
                marginLeft: this.props.icon !== undefined ? 10 : undefined,
                color: color,
                fontSize: fontSize
              }}
            >{this.props.title}</Text>
            : null
        }
      </TouchableOpacity>
    );
  }
}
