import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import ScrollPage from '@/components/ScrollPage';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import { PAGE_WITH } from '@/components/ScrollPage';

const words = ["What's", 'up', 'mobile', 'devs?'];
const MAX_TRANSLATE_X = -PAGE_WITH * (words.length - 1); //since translateX will always be negative

const ScrollView = () => {
  const translationX = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);

  const clampedTranslationX = useDerivedValue(() => {
    return Math.max(Math.min(translationX.value, 0), MAX_TRANSLATE_X);
  });
  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      cancelAnimation(translationX);
      prevTranslationX.value = clampedTranslationX.value;
    })
    .onUpdate((event) => {
      translationX.value = event.translationX + prevTranslationX.value;
    })
    .onEnd((event) => {
      translationX.value = withDecay({
        velocity: event.velocityX,
      });
    })
    .runOnJS(true);
  return (
    <View style={{ flex: 1 }}>
      <GestureHandlerRootView>
        <GestureDetector gesture={pan}>
          <Animated.View style={styles.container}>
            {words.map((word, index) => (
              <ScrollPage
                key={index}
                index={index}
                title={word}
                translationX={clampedTranslationX}
              />
            ))}
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default ScrollView;
