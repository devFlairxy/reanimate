import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { Circle, Svg } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

const { width, height } = Dimensions.get('window');

const CIRCLE_LENGTH = 1000; //2PiR
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgressBar = () => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
    };
  });

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });
  const run = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 });
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.progressText}> {progressText.value} </Text> */}
      <ReText style={styles.progressText} text={progressText} />
      <Svg style={{ position: 'absolute' }}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
          fill="none"
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          fill="none"
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
        />
      </Svg>
      <TouchableOpacity onPress={run} style={styles.button}>
        <Text style={styles.buttonText}>Run</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  progressText: {
    fontSize: 80,
    color: 'rgba(256, 256, 256, 0.7)',
    width: 200,
    textAlign: 'center',
  },
  button: {
    bottom: 80,
    width: width * 0.7,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    position: 'absolute',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    letterSpacing: 2.0,
  },
});

export default CircularProgressBar;
