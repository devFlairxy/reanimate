import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface PageProps {
  index: number;
  title: string;
  translationX: SharedValue<number>;
}

export const { width: PAGE_WITH } = Dimensions.get('window');

const ScrollPage = ({ index, title, translationX }: PageProps) => {
  const pageOffet = PAGE_WITH * index;
  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value + pageOffet }],
  }));
  return (
    <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          flex: 1,
          backgroundColor: `rgba(0,0, 256, 0.${index + 2})`,
          alignItems: 'center',
          justifyContent: 'center',
        },
        rStyle,
      ]}
    >
      <Text
        style={{
          fontSize: 70,
          fontWeight: '700',
          letterSpacing: 1.5,
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Text>
    </Animated.View>
  );
};

export default ScrollPage;
