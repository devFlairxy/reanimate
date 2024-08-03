import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {

  return (
    <View style={styles.container}>
      <Text>Intro to Animations</Text>
      <Link style={styles.link} href="/intro">Basic</Link>
      <Link style={styles.link} href="/panGesture">Pan Gesture</Link>
      <Link style={styles.link} href="/interpolateScrollview">Interpolate with ScrollView</Link>
      <Link style={styles.link} href="/interpolateColors">Interpolate Colors (Theme Animation)</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: 'rgba(0, 0, 256, 0.5)',
    fontWeight: 'bold'
  }
});
