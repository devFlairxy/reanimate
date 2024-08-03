import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PinchGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const imageUrl =
  'https://images.unsplash.com/photo-1721332155433-3a4b5446bcd9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MXx8fGVufDB8fHx8fA%3D%3D';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const { width, height } = Dimensions.get('window');

const PinchGesture = () => {
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const scale = useSharedValue(1);
  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      focalX.value = event.focalX;
      focalY.value = event.focalY;
      scale.value = event.scale;
    })
    .onEnd(() => {
      scale.value = withTiming(1)
    })
    .runOnJS(true);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        //transform is executed in the arrangement order
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        {scale: scale.value},
        //reverting back to original after scaling by multiplying by -1
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ],
    };
  });

  const rFocusStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    };
  });
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pinch}>
        <Animated.View style={{ flex: 1 }}>
          <AnimatedImage
            style={[{ flex: 1 }, rStyle]}
            source={{ uri: imageUrl }}
          />
          <Animated.View style={[styles.focalPoint, rFocusStyle]} />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});

export default PinchGesture;
