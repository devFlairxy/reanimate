import Intro from '@/components/Intro';
import PanGesture from '@/components/PanGesture';
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {

  return (
    <View style={styles.container}>
      {/* <Intro /> */}

      {/* Pan Gestur Basics  */}
      <PanGesture /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
