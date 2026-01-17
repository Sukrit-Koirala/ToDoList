import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Serif: require('../assets/fonts/Prata.ttf'),
    FreckleFace: require('../assets/fonts/FreckleFace.ttf'), // rename file if needed
    PlayFair: require('../assets/fonts/PlayFair.ttf'),
    PlayFairBold: require('../assets/fonts/PlayFair-Bold.ttf'),
    PlayFairBoldExtra: require('../assets/fonts/PlayFair-Bold-Extra.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or splash screen
  }
  queryClient.clear()

  return (
    <QueryClientProvider client={queryClient}>
    <LinearGradient
      colors={['#0F172A', 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.6 }}
      style={styles.container}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </LinearGradient>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
