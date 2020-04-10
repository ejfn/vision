import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
  icon?: string;
  title?: string;
  fontSize?: number;
  color?: string;
  style?: {};
  disabled?: boolean;
  onPress(): void;
}

export default function Button(props: Props) {
  const fontSize: number = props.fontSize !== undefined ? props.fontSize : 16;
  const color: string = props.color !== undefined ? props.color : '#eeeeee';

  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      activeOpacity={0.5}
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'nowrap',
          alignContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          backgroundColor: '#4169e1',
          paddingHorizontal: fontSize,
          paddingVertical: fontSize * 0.6,
        },
        props.style,
      ]}
    >
      {
        props.icon
        && (
          <Ionicons
            name={props.icon}
            color={color}
            size={fontSize + 4}
          />
        )
      }
      {
        props.title
        && (
          <Text
            ellipsizeMode="middle"
            style={{
              marginLeft: props.icon !== undefined ? fontSize * 0.5 : undefined,
              color,
              fontSize,
            }}
          >
            {props.title}
          </Text>
        )
      }
    </TouchableOpacity>
  );
}
