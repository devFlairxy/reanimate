import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Palette } from '@/constants/Index';
import SegmentedControl from '@/components/SegmentedControl';

const options = ['Light', 'Standard', 'Pro'];

const SegmentedControlAnimation = () => {
  const [fontsLoaded, error] = Font.useFonts({
    'SF-Compact-Rounded-Medium': require('../assets/fonts/SF-Compact-Rounded-Medium.otf'),
  });
  const [selectedOption, setSelectedOption] = useState('Standard');
  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && error) return null;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SegmentedControl
        options={options}
        selectedOption={selectedOption}
        onOptionPress={setSelectedOption}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SegmentedControlAnimation;
