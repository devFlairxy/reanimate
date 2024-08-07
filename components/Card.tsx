import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type CardProps = {
  progress: SharedValue<number>;
  index: number;
};

const Card = ({ progress, index }: CardProps) => {
  const rStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, index * 20]);
    const translateY = interpolate(progress.value, [0, 1], [0, -index * 5]);
    const rotate = interpolate(
      progress.value,
      [0, 1],
      [-index * 10, index * 10]
    );
    return {
      transform: [
        { translateX },
        { translateY },
        {
          rotate: `${rotate}deg`,
        },
      ],
    };
  }, []);
  return (
    <Animated.View
      key={index}
      style={[
        styles.card,
        {
          zIndex: -index,
        },
        rStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    height: 180,
    aspectRatio: 3 / 4,
    backgroundColor: 'white',
    borderRadius: 25,
    borderCurve: 'continuous',
    shadowColor: '#cccccc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#B9B9B9',
    position: 'absolute',
  },
});

export default Card;
