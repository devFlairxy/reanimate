import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, { useRef } from 'react';
import Images from '@/constants/Images';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const InstagramLike = () => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: Math.max(scale.value, 0) }],
    };
  });
  const rTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  const singleTap = Gesture.Tap().onEnd(() => {
    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) opacity.value = withDelay(500, withTiming(1));
    });
  });
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      scale.value = withSpring(1, undefined, (isFinished) => {
        if (isFinished) scale.value = withDelay(500, withSpring(0));
      });
    });
  const taps = Gesture.Exclusive(doubleTap, singleTap);
  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={taps}>
        <Animated.View>
          <ImageBackground source={Images.bg} style={styles.image}>
            <View style={{ elevation: 8 }}>
              <AnimatedImage
                source={Images.heart}
                style={[
                  rStyle,
                  styles.image,
                  {
                    shadowOffset: {
                      width: 0,
                      height: 20,
                    },
                    shadowOpacity: 0.35,
                    shadowRadius: 35,
                  },
                ]}
                resizeMode="center"
              />
            </View>
            <Animated.Text style={[styles.turtle, rTextStyle]}>
              🐢🐢🐢🐢🐢
            </Animated.Text>
          </ImageBackground>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const { width: SIZE } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  turtle: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 30,
  },
});

export default InstagramLike;
