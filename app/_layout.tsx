import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RootLayout() {
  return (
    <LinearGradient
      colors={['#0F172A', 'transparent']} // top → middle
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.6 }} // stops around mid screen
      style={styles.container}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
