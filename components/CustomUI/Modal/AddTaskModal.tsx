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
  existingTodos?: Array<{
    scheduleType: ScheduleType
    startTime?: string
    endTime?: string
  }>
  onAdd: (data: {
    title: string
    description?: string
    priority: Priority
    scheduleType: ScheduleType
    startTime?: string
    endTime?: string
    dueDate?: string
  }) => void
  onCancel: () => void
}

const AddTaskBottomSheet: React.FC<Props> = ({
  sheetRef,
  accentColor,
  existingTodos = [],
  onAdd,
  onCancel,
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>(Priority.NONE)

  // Schedule type selection
  const [scheduleType, setScheduleType] = useState<ScheduleType>(ScheduleType.NONE)

  // Time scheduling
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)

  // Date scheduling
  const [dueDate, setDueDate] = useState<Date | null>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [dueTime, setDueTime] = useState<Date | null>(null)
  const [showDueTimePicker, setShowDueTimePicker] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeConflictError, setTimeConflictError] = useState<string | null>(null)

  const snapPoints = useMemo(() => ['90%'], [])

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.4}
    />
  )

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setPriority(Priority.NONE)
    setScheduleType(ScheduleType.NONE)
    setStartTime(null)
    setEndTime(null)
    setDueDate(null)
    setDueTime(null)
    setIsSubmitting(false)
    setTimeConflictError(null)
  }

  // Check for time conflicts
  const checkTimeConflict = (newStart: Date, newEnd?: Date): boolean => {
    if (scheduleType !== ScheduleType.TIME || !newStart) return false

    const newStartTime = newStart.getTime()
    const newEndTime = newEnd ? newEnd.getTime() : newStartTime + (60 * 60 * 1000) // Default 1 hour if no end time

    for (const todo of existingTodos) {
      if (todo.scheduleType !== ScheduleType.TIME || !todo.startTime) continue

      const existingStart = new Date(todo.startTime).getTime()
      const existingEnd = todo.endTime 
        ? new Date(todo.endTime).getTime() 
        : existingStart + (60 * 60 * 1000)

      // Check for overlap
      const hasOverlap = 
        (newStartTime >= existingStart && newStartTime < existingEnd) ||
        (newEndTime > existingStart && newEndTime <= existingEnd) ||
        (newStartTime <= existingStart && newEndTime >= existingEnd)

      if (hasOverlap) {
        return true
      }
    }

    return false
  }

  const handleAdd = async () => {
    if (!title.trim() || isSubmitting) return

    // Check for time conflicts when scheduling with time
    if (scheduleType === ScheduleType.TIME && startTime) {
      const hasConflict = checkTimeConflict(startTime, endTime || undefined)
      if (hasConflict) {
        setTimeConflictError('This time slot is already taken by another task')
        return
      }
    }

    setIsSubmitting(true)
    setTimeConflictError(null)

    try {
      // Combine date and time for due date with time
      let finalDueDate: string | undefined
      if (scheduleType === ScheduleType.DAY && dueDate) {
        if (dueTime) {
          // Combine date and time into a single ISO string
          const combined = new Date(dueDate)
          combined.setHours(dueTime.getHours())
          combined.setMinutes(dueTime.getMinutes())
          combined.setSeconds(0)
          combined.setMilliseconds(0)
          finalDueDate = combined.toISOString()
        } else {
          // Just date without time
          finalDueDate = dueDate.toISOString().split('T')[0] // YYYY-MM-DD
        }
      }

      await onAdd({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        scheduleType,
        startTime: scheduleType === ScheduleType.TIME && startTime 
          ? startTime.toISOString() 
          : undefined,
        endTime: scheduleType === ScheduleType.TIME && endTime 
          ? endTime.toISOString() 
          : undefined,
        dueDate: finalDueDate,
      })

      resetForm()
    } catch (error) {
      console.error('Error adding task:', error)
      setIsSubmitting(false)
    }
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

  const scheduleOptions = [
    { label: 'None', value: ScheduleType.NONE },
    { label: 'Due Date', value: ScheduleType.DAY },
    { label: 'Time Block', value: ScheduleType.TIME },
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
        <Text style={styles.title}>What's your task?</Text>

        {/* TITLE */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Task Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputValue}
              placeholder="Enter task name"
              placeholderTextColor="#9CA3AF"
              value={title}
              onChangeText={setTitle}
              autoFocus
            />
          </View>
        </View>

        {/* DESCRIPTION */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Description</Text>
          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <TextInput
              style={[styles.inputValue, styles.textAreaValue]}
              placeholder="Add details (Optional)"
              placeholderTextColor="#9CA3AF"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* PRIORITY */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Priority</Text>
          <View style={styles.segmentedControl}>
            {priorityOptions.map((option, index) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.segment,
                  index === 0 && styles.segmentFirst,
                  index === priorityOptions.length - 1 && styles.segmentLast,
                  priority === option.value && {
                    backgroundColor: accentColor,
                  },
                ]}
                onPress={() => setPriority(option.value)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.segmentText,
                    priority === option.value && styles.segmentTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* SCHEDULE TYPE */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Schedule</Text>
          <View style={styles.segmentedControl}>
            {scheduleOptions.map((option, index) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.segment,
                  index === 0 && styles.segmentFirst,
                  index === scheduleOptions.length - 1 && styles.segmentLast,
                  scheduleType === option.value && {
                    backgroundColor: accentColor,
                  },
                ]}
                onPress={() => {
                  setScheduleType(option.value)
                  // Reset related fields when switching types
                  if (option.value !== ScheduleType.TIME) {
                    setStartTime(null)
                    setEndTime(null)
                  }
                  if (option.value !== ScheduleType.DAY) {
                    setDueDate(null)
                    setDueTime(null)
                  }
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.segmentText,
                    scheduleType === option.value && styles.segmentTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* DUE DATE PICKER */}
        {scheduleType === ScheduleType.DAY && (
          <>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Due Date</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShowDatePicker(true)}
                activeOpacity={0.7}
              >
                <Text style={dueDate ? styles.inputValue : styles.inputPlaceholder}>
                  {dueDate
                    ? dueDate.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })
                    : 'Set due date'}
                </Text>
                <Text style={styles.inputIcon}>📅</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Due Time <Text style={styles.optionalText}>(Optional)</Text></Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShowDueTimePicker(true)}
                activeOpacity={0.7}
              >
                <Text style={dueTime ? styles.inputValue : styles.inputPlaceholder}>
                  {dueTime
                    ? dueTime.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })
                    : 'Set due time'}
                </Text>
                <Text style={styles.inputIcon}>🕐</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* TIME PICKERS */}
        {scheduleType === ScheduleType.TIME && (
          <>
            {timeConflictError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>⚠️ {timeConflictError}</Text>
              </View>
            )}

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Start Time</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShowStartPicker(true)}
                activeOpacity={0.7}
              >
                <Text style={startTime ? styles.inputValue : styles.inputPlaceholder}>
                  {startTime
                    ? startTime.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })
                    : 'Set start time'}
                </Text>
                <Text style={styles.inputIcon}>🕐</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>End Time <Text style={styles.optionalText}>(Optional)</Text></Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShowEndPicker(true)}
                activeOpacity={0.7}
              >
                <Text style={endTime ? styles.inputValue : styles.inputPlaceholder}>
                  {endTime
                    ? endTime.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })
                    : 'Set end time'}
                </Text>
                <Text style={styles.inputIcon}>🕐</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* DATE PICKER */}
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            value={dueDate || new Date()}
            onChange={(_, date) => {
              setShowDatePicker(false)
              if (date) setDueDate(date)
            }}
          />
        )}

        {/* DUE TIME PICKER */}
        {showDueTimePicker && (
          <DateTimePicker
            mode="time"
            value={dueTime || new Date()}
            onChange={(_, date) => {
              setShowDueTimePicker(false)
              if (date) setDueTime(date)
            }}
          />
        )}

        {/* START TIME PICKER */}
        {showStartPicker && (
          <DateTimePicker
            mode="time"
            value={startTime || new Date()}
            onChange={(_, date) => {
              setShowStartPicker(false)
              if (date) {
                setStartTime(date)
                setTimeConflictError(null)
              }
            }}
          />
        )}

        {/* END TIME PICKER */}
        {showEndPicker && (
          <DateTimePicker
            mode="time"
            value={endTime || new Date()}
            onChange={(_, date) => {
              setShowEndPicker(false)
              if (date) {
                setEndTime(date)
                setTimeConflictError(null)
              }
            }}
          />
        )}

        {/* ACTIONS */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleCancel}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.nextButton,
              { backgroundColor: accentColor },
              (!title.trim() || isSubmitting) && styles.disabled,
            ]}
            disabled={!title.trim() || isSubmitting}
            onPress={handleAdd}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>
              {isSubmitting ? 'Creating...' : 'Create →'}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}

export default AddTaskBottomSheet

// ---------------- STYLES ----------------

const styles = StyleSheet.create({
  sheetBackground: { 
    backgroundColor: '#FFFFFF',
  },
  sheetHandle: { 
    backgroundColor: '#E5E7EB',
    width: 36,
    height: 5,
    borderRadius: 3,
  },

  content: {
    padding: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 32,
    marginTop: 8,
  },

  fieldGroup: {
    marginBottom: 24,
  },

  fieldLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9CA3AF',
    marginBottom: 12,
  },

  optionalText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#D1D5DB',
  },

  inputContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textAreaContainer: {
    paddingVertical: 12,
    alignItems: 'flex-start',
  },

  inputValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6366F1',
    flex: 1,
  },

  textAreaValue: {
    minHeight: 80,
    textAlignVertical: 'top',
  },

  inputPlaceholder: {
    fontSize: 18,
    fontWeight: '500',
    color: '#D1D5DB',
    flex: 1,
  },

  inputIcon: {
    fontSize: 20,
    marginLeft: 8,
  },

  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },

  segment: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  segmentFirst: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },

  segmentLast: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },

  segmentText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },

  segmentTextActive: {
    color: '#FFFFFF',
  },

  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    alignItems: 'center',
  },

  backButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButtonText: {
    fontSize: 24,
    color: '#6B7280',
  },

  nextButton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  nextButtonText: { 
    color: 'white', 
    fontWeight: '700', 
    fontSize: 17,
  },

  disabled: { 
    opacity: 0.5,
    shadowOpacity: 0.1,
  },

  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },

  errorText: {
    color: '#991B1B',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
})