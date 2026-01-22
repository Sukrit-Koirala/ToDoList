import React, { useMemo, useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from 'react-native'
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Priority, ScheduleType } from '../../../types/todos'

interface Props {
  sheetRef: React.RefObject<BottomSheetModal | null>
  groupId: string
  accentColor: string
  onAdd: (data: {
    title: string
    description?: string
    priority: Priority
    scheduleType: ScheduleType
    startTime?: string
    endTime?: string
  }) => void
  onCancel: () => void
}

const AddTaskBottomSheet: React.FC<Props> = ({
  sheetRef,
  accentColor,
  onAdd,
  onCancel,
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>(Priority.NONE)

  const [useTime, setUseTime] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)

  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)

  const snapPoints = useMemo(() => ['85%'], [])

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.5}
    />
  )

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setPriority(Priority.NONE)
    setUseTime(false)
    setStartTime(null)
    setEndTime(null)
  }

  const handleAdd = () => {
    if (!title.trim()) return

    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      scheduleType: useTime ? ScheduleType.TIME : ScheduleType.NONE,
      startTime: useTime && startTime ? startTime.toISOString() : undefined,
      endTime: useTime && endTime ? endTime.toISOString() : undefined,
    })

    resetForm()
  }

  const handleCancel = () => {
    resetForm()
    onCancel()
  }

  const priorityOptions = [
    { label: 'None', value: Priority.NONE },
    { label: 'Low', value: Priority.LOW },
    { label: 'High', value: Priority.HIGH },
  ]

  return (
    <BottomSheetModal
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      keyboardBehavior="interactive"
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

        {/* TITLE */}
        <View style={styles.section}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="What needs to be done?"
            value={title}
            onChangeText={setTitle}
            autoFocus
          />
        </View>

        {/* DESCRIPTION */}
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

        {/* PRIORITY */}
        <View style={styles.section}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityGrid}>
            {priorityOptions.map(option => (
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

        {/* TIME TOGGLE */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.timeToggle}
            onPress={() => setUseTime(v => !v)}
          >
            <Text style={styles.label}>Add Time</Text>
            <Text style={styles.toggleValue}>{useTime ? '✓' : ''}</Text>
          </TouchableOpacity>
        </View>

        {/* TIME PICKERS */}
        {useTime && (
          <View style={styles.section}>
            <Text style={styles.label}>Start Time</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowStartPicker(true)}
            >
              <Text>
                {startTime
                  ? startTime.toLocaleTimeString()
                  : 'Select start time'}
              </Text>
            </TouchableOpacity>

            <Text style={[styles.label, { marginTop: 12 }]}>
              End Time (Optional)
            </Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowEndPicker(true)}
            >
              <Text>
                {endTime
                  ? endTime.toLocaleTimeString()
                  : 'Select end time'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* PICKERS */}
        {showStartPicker && (
          <DateTimePicker
            mode="time"
            value={startTime || new Date()}
            onChange={(_, date) => {
              setShowStartPicker(false)
              if (date) setStartTime(date)
            }}
          />
        )}

        {showEndPicker && (
          <DateTimePicker
            mode="time"
            value={endTime || new Date()}
            onChange={(_, date) => {
              setShowEndPicker(false)
              if (date) setEndTime(date)
            }}
          />
        )}

        {/* ACTIONS */}
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

// ---------------- STYLES ----------------

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
  },

  section: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#fafafa',
  },

  textArea: {
    minHeight: 100,
  },

  priorityGrid: {
    flexDirection: 'row',
    gap: 10,
  },

  priorityChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    borderColor: '#ddd',
  },

  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },

  priorityTextActive: {
    color: 'white',
  },

  timeToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  toggleValue: {
    fontSize: 18,
    fontWeight: '700',
  },

  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },

  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  cancel: { backgroundColor: '#f0f0f0' },
  cancelText: { fontWeight: '600', fontSize: 16 },

  addText: { color: 'white', fontWeight: '600', fontSize: 16 },

  disabled: { opacity: 0.4 },
})
