import { Pressable, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RoundedRectangle from '../RoundedRectangle/RoundedRectangle';

function AddTabButton({ onPress }: any) {
  return (
    <Pressable onPress={onPress} style={styles.wrapper}>
      <View style={styles.halo}>
        <View style={styles.button}>
          <Ionicons name="add" size={28} color="#fff" />
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
