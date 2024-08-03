import { View, Text, Image } from 'react-native';
import React from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PinchGestureHandler,
} from 'react-native-gesture-handler';

const imageUrl =
  'https://plus.unsplash.com/premium_photo-1722009043668-b3c470595df9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D';

const PinchGesture = () => {
  const pinch = Gesture.Pinch()
    .onStart(() => {})
    .onUpdate(() => {})
    .runOnJS(true);
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pinch}>
        <Image style={{ flex: 1 }} source={{ uri: imageUrl }} />
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default PinchGesture;
