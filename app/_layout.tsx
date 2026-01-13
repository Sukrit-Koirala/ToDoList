import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Serif: require('../assets/fonts/Prata.ttf'),
    FreckleFace: require('../assets/fonts/FreckleFace.ttf'), // rename file if needed
    PlayFair: require('../assets/fonts/PlayFair.ttf'),
    PlayFairBold: require('../assets/fonts/PlayFair-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or splash screen
  }

  return (
    <LinearGradient
      colors={['#0F172A', 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.6 }}
      style={styles.container}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
