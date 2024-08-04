import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Square from '@/components/Square';
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const ClockLoader = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(4 * Math.PI, { duration: 6000, easing: Easing.linear }), -1
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />

      {new Array(12).fill(0).map((_, index) => {
        return <Square progress={progress} index={index} key={index} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
});

export default ClockLoader;
