/* eslint-disable max-classes-per-file */
import * as React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { VisionResult } from '../api/types';


function Tag(props: { text: string; style?: ViewStyle; }) {
  return (
    <View
      style={[
        {
          backgroundColor: '#2e7d32',
          borderRadius: 7,
          paddingHorizontal: 6,
        },
        props.style,
      ]}
    >
      <Text
        style={{
          color: '#ffffff',
        }}
      >
        {props.text}
      </Text>
    </View>
  );
}

export default function VisionTag(props: { vision: VisionResult; }) {
  const { captions, tags } = props.vision.description;

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        opacity: 0.8,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {
          tags.map((t: string, i: number) => (
            <Tag
              text={t}
              key={i.toString()}
              style={{
                marginBottom: 1,
                marginHorizontal: 0.5,
              }}
            />
          ))
        }
      </View>
      <View
        style={{
          alignSelf: 'stretch',
          backgroundColor: '#2e7d32',
          paddingHorizontal: 6,
          paddingVertical: 1,
        }}
      >
        <Text
          style={{
            color: '#ffffff',
          }}
        >
          {captions[0].text}
        </Text>
      </View>
    </View>
  );
}
