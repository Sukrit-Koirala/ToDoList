// modal/AddTaskModal.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native'

export default function OpenBoardsModal({ onClose }: any) {
  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text>Add Task for</Text>

        <Pressable onPress={onClose}>
          <Text>Close</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    width: '85%',
  },
})
