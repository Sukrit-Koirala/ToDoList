import React, { useMemo, useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native'
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import { Priority } from '../../../types/todos'

interface Props {
  sheetRef: React.RefObject<BottomSheetModal | null>
  groupId: string
  accentColor: string
  onAdd: (data: {
    title: string
    description?: string
    priority: Priority
  }) => void
  onCancel: () => void
}

const AddTaskBottomSheet: React.FC<Props> = ({
  sheetRef,
  groupId,
  accentColor,
  onAdd,
  onCancel,
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>(Priority.NONE)

  const snapPoints = useMemo(() => ['85%'], [])

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.5}
    />
  )

  const handleAdd = () => {
    if (!title.trim()) return

    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
    })

    // Reset form
    setTitle('')
    setDescription('')
    setPriority(Priority.NONE)
  }

  const handleCancel = () => {
    setTitle('')
    setDescription('')
    setPriority(Priority.NONE)
    onCancel()
  }

  const priorityOptions = [
    { label: 'None', value: Priority.NONE },
    { label: 'Low', value: Priority.LOW },
    { label: 'Medium', value: Priority.MEDIUM },
    { label: 'High', value: Priority.HIGH },
  ]

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

        {/* Title Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="What needs to be done?"
            value={title}
            onChangeText={setTitle}
            autoFocus
            returnKeyType="next"
          />
        </View>

        {/* Description Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Description (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add more details..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Priority Selector */}
        <View style={styles.section}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityGrid}>
            {priorityOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.priorityChip,
                  priority === option.value && {
                    backgroundColor: accentColor,
                    borderColor: accentColor,
                  },
                ]}
                onPress={() => setPriority(option.value)}
              >
                <Text
                  style={[
                    styles.priorityText,
                    priority === option.value && styles.priorityTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, styles.cancel]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: accentColor },
              !title.trim() && styles.disabled,
            ]}
            disabled={!title.trim()}
            onPress={handleAdd}
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
    paddingBottom: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
    color: '#1a1a1a',
  },

  section: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },

  textArea: {
    minHeight: 100,
    paddingTop: 14,
  },

  priorityGrid: {
    flexDirection: 'row',
    gap: 10,
  },

  priorityChip: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ddd',
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },

  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },

  priorityTextActive: {
    color: 'white',
  },

  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },

  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  cancel: { backgroundColor: '#f0f0f0' },
  cancelText: { color: '#666', fontWeight: '600', fontSize: 16 },

  addText: { color: 'white', fontWeight: '600', fontSize: 16 },

  disabled: { opacity: 0.4 },
})