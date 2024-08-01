import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const SIZE = 100;
const CIRCLE_RADIUS = SIZE * 2;
const { width, height } = Dimensions.get('screen');

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

const PanGesture = () => {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      const maxTranslateX = width / 2 - 50;
      const maxTranslateY = height / 2 - 100;
      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        -maxTranslateY,
        maxTranslateY
      );
    })
    .onEnd(() => {
      const distance = Math.sqrt(
        translationX.value ** 2 + translationY.value ** 2
      );
      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translationX.value = withSpring(0);
        translationY.value = withSpring(0);
      }
    })
    .runOnJS(true);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translationX.value,
        },
        {
          translateY: translationY.value,
        },
      ],
    };
  });
  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.circle}>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.square, rStyle]} />
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.5)',
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0, 0, 256, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PanGesture;
