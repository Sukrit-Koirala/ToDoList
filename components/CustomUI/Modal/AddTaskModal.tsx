import React, { useMemo } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native'
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'

interface Props {
  sheetRef: React.RefObject<BottomSheetModal | null>
  value: string
  onChangeText: (text: string) => void
  onAdd: () => void
  onCancel: () => void
  accentColor: string
}

const AddTaskBottomSheet: React.FC<Props> = ({
  sheetRef,
  value,
  onChangeText,
  onAdd,
  onCancel,
  accentColor,
}) => {
  const snapPoints = useMemo(() => ['80%'], [])

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.5}
    />
  )

  return (
    <BottomSheetModal
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.sheetHandle}
    >
      <BottomSheetScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Add New Task</Text>

        <TextInput
          style={styles.input}
          placeholder="Task title..."
          value={value}
          onChangeText={onChangeText}
          autoFocus
          returnKeyType="done"
          onSubmitEditing={onAdd}
        />

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, styles.cancel]}
            onPress={onCancel}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: accentColor },
              !value.trim() && styles.disabled,
            ]}
            disabled={!value.trim()}
            onPress={onAdd}
          >
            <Text style={styles.addText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}

export default AddTaskBottomSheet

// ------------------- Styles -------------------
const styles = StyleSheet.create({
  sheetBackground: { backgroundColor: 'white' },
  sheetHandle: { backgroundColor: '#ccc' },

  content: {
    padding: 24,
    paddingBottom: 32, 
    height:'90%'
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    fontSize: 16,
  },

  buttons: {
    flexDirection: 'row',
    gap: 12,
  },

  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  cancel: { backgroundColor: '#f0f0f0' },
  cancelText: { color: '#666', fontWeight: '600' },

  addText: { color: 'white', fontWeight: '600' },

  disabled: { opacity: 0.5 },
})
