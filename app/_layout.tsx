import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="panGesture"
        options={{ headerTitle: 'Pan Gesture' }}
      />
      <Stack.Screen name="intro" options={{ headerTitle: 'Basic Animation' }} />
      <Stack.Screen name="interpolateScrollview" options={{ headerShown: false }}
      />
       <Stack.Screen name="interpolateColors" options={{ headerShown: false }}
      />
    </Stack>
  );
}
