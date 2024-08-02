import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from '@/components/Page';

const WORDS = ["What's", 'up', 'mobile', 'devs'];

const InterpolateScrollview = () => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  return (
    <Animated.ScrollView
      pagingEnabled
      horizontal
      scrollEventThrottle={16}
      onScroll={scrollHandler}
      style={styles.container}
    >
      {WORDS.map((word, index) => (
        <Page title={word} index={index} key={index} translateX={translateX} />
      ))}
    </Animated.ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default InterpolateScrollview;
