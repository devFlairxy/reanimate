import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { TaskInterface } from '@/app/swipeToDelete';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';

interface ListItemProps {
  task: TaskInterface;
  handleDismiss?: (task: TaskInterface) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const LIST_ITEM_HEIGHT = 70;
const TRANSLATE_X_TRESHOLD = -SCREEN_WIDTH * 0.3;

const ListItem = ({ task, handleDismiss }: ListItemProps) => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const initialTouchLocation = useSharedValue<{ x: number; y: number } | null>(
    null
  );
  const marginVertical = useSharedValue(10);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);

  const dragGesture = Gesture.Pan()
    .manualActivation(true)
    .onBegin((evt) => {
      initialTouchLocation.value = { x: evt.x, y: evt.y };
    })
    .onTouchesMove((evt, state) => {
      // Sanity checks
      if (!initialTouchLocation.value || !evt.changedTouches.length) {
        state.fail();
        return;
      }

      const xDiff = Math.abs(
        evt.changedTouches[0].x - initialTouchLocation.value.x
      );
      const yDiff = Math.abs(
        evt.changedTouches[0].y - initialTouchLocation.value.y
      );
      const isHorizontalPanning = xDiff > yDiff;

      if (isHorizontalPanning) {
        state.activate();
      } else {
        state.fail();
      }
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_TRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && handleDismiss) {
            runOnJS(handleDismiss)(task);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      width: '90%',
      transform: [{ translateX: translateX.value }],
    };
  });
  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < TRANSLATE_X_TRESHOLD ? 1 : 0);
    return { opacity };
  });
  const rTaskContainerStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    marginVertical: marginVertical.value,
    opacity: opacity.value,
  }));

  return (
    <GestureHandlerRootView>
      <Animated.View
        style={[styles.icon, rIconContainerStyle, rTaskContainerStyle]}
      >
        <FontAwesome5
          name={'trash-alt'}
          size={LIST_ITEM_HEIGHT * 0.4}
          color={'red'}
        />
      </Animated.View>
      <Animated.View style={[styles.container, rTaskContainerStyle]}>
        <GestureDetector gesture={dragGesture}>
          <Animated.View style={[styles.task, rStyle]}>
            <Text style={styles.title}>{task.title}</Text>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  task: {
    width: '90%',
    height: LIST_ITEM_HEIGHT,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
    //android shadow
    elevation: 5,
    //ios shadow
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
  },
  icon: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: 'absolute',
    right: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListItem;
