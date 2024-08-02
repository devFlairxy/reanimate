import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const SIZE = 100;

const Intro = () => {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const handleRotation = (progress: SharedValue<number>) => {
    'worklet';
    return `${progress.value * 2 * Math.PI}rad`;
  };

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), 3, true);
    scale.value = withRepeat(withSpring(1), 3, true);
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          { width: SIZE, height: SIZE, backgroundColor: 'blue' },
          reanimatedStyle,
        ]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Intro;
