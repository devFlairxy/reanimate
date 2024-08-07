import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Card from '@/components/Card';

const StackedCards = () => {
  const progress = useSharedValue(0);
  return (
    <View
      style={styles.container}
      onTouchStart={() => {
        progress.value = withSpring(1, {
          mass: 1,
        });
      }}
      onTouchEnd={() => {
        progress.value = withSpring(0, {
          mass: 2,
        });
      }}
    >
      <StatusBar style="auto" />
      {new Array(4).fill(null).map((_, index) => {
        return <Card index={index} key={index} progress={progress} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default StackedCards;
