import CircularCarousel from '@/components/CircularCarousel';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
const data = [
  require('../assets/images/00.jpg'),
  require('../assets/images/01.jpg'),
  require('../assets/images/02.jpg'),
  require('../assets/images/03.jpg'),
  require('../assets/images/04.jpg'),
  require('../assets/images/05.jpg'),
  require('../assets/images/06.jpg'),
];

export default function CircularCarouselAnimation() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CircularCarousel data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});