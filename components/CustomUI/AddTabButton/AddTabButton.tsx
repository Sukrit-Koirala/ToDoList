import { Pressable, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme'; // adjust path if needed

function AddTabButton({ onPress }: any) {
  const { theme, isLoading } = useTheme();

  if (isLoading) return null; // optional

  return (
    <Pressable onPress={onPress} style={styles.wrapper}>
      <View style={styles.halo}>
        <View style={[styles.button,{backgroundColor:theme.headerBackground}]}>
          <Ionicons name="add" size={28} color={'#ffff'} /> 
          {/* Only icon color changes based on theme */}
        </View>
      </View>
    </Pressable>
  );
}

export default AddTabButton;

const styles = StyleSheet.create({
  wrapper: {
    top: -18,
    alignItems: 'center',
  },

  halo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
