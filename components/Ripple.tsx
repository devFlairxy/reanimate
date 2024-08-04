import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import Animated, {
  measure,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

interface RippleProps {
  style?: StyleProp<ViewStyle>;
  onTap?: () => void;
  children?: React.ReactNode;
}

const Ripple = ({ style, onTap, children }: RippleProps) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);
  const boundary = useSharedValue({ width: 0, height: 0 });
  const rippleOpactiy = useSharedValue(1);

  const aRef = useAnimatedRef();

  const tap = Gesture.Tap()
    .onStart((e) => {
      const layout = measure(aRef);
      if (layout) {
        boundary.value.width = layout.width;
        boundary.value.height = layout.height;
      }
      centerX.value = e.x;
      centerY.value = e.y;
      rippleOpactiy.value = 1;
      scale.value = 0;
      scale.value = withTiming(1, { duration: 1000 });
    })
    .onBegin(() => {
      if (onTap) runOnJS(onTap);
    })
    .onFinalize((e) => {
      rippleOpactiy.value = withTiming(0, { duration: 1000 });
    });

  const rStyle = useAnimatedStyle(() => {
    const { width, height } = boundary.value;
    const circleRadius = Math.sqrt(width ** 2 + height ** 2);
    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;
    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      opacity: rippleOpactiy.value,
      borderRadius: circleRadius,
      backgroundColor: 'rgba(0,0,0,0.2)',
      position: 'absolute',
      top: 0,
      left: 0,
      transform: [{ translateX }, { translateY }, { scale: scale.value }],
    };
  });
  return (
    <View style={[{ justifyContent: 'center' }, style]}>
      <GestureHandlerRootView>
        <GestureDetector gesture={tap}>
          <Animated.View style={[style, { overflow: 'hidden' }]} ref={aRef}>
            <View>{children}</View>
            <Animated.View style={rStyle}></Animated.View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

export default Ripple;
