import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Dropdown from '@/components/Dropdown';

const options = [
  { label: 'Charts', iconName: 'barschart' },
  { label: 'Book', iconName: 'book' },
  { label: 'Calendar', iconName: 'calendar' },
  { label: 'Camera', iconName: 'camera' },
];

const header = {
  label: 'Header',
  iconName: 'ellipsis1',
};

export default function DropdownAnimation() {
  return (
    <View style={styles.container}>
        <StatusBar style='light' />
      <Dropdown header={header} options={options} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111'
  },
});
