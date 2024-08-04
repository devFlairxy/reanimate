import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Ripple from '@/components/Ripple';

const RippleEffect = () => {
  const onTap = () => {};
  return (
    <View style={styles.container}>
      <Ripple style={styles.ripple} onTap={() => onTap}>
        <Text style={{ fontSize: 25 }}>Tap</Text>
      </Ripple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  ripple: {
    width: 200,
    height: 200,
    backgroundColor: '#FFF',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
});

export default RippleEffect;
