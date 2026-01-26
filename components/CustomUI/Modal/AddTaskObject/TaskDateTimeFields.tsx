import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { ScheduleType } from '../../../../types/todos'
import { Ionicons } from '@expo/vector-icons'

interface Props {
  scheduleType: ScheduleType
  accentColor: string
  startTime: Date | null
  endTime: Date | null
  dueDate: Date | null
  dueTime: Date | null
  scheduledDate: Date | null // NEW
  timeConflictError: string | null
  onStartTimeChange: (date: Date | null) => void
  onEndTimeChange: (date: Date | null) => void
  onDueDateChange: (date: Date | null) => void
  onDueTimeChange: (date: Date | null) => void
  onScheduledDateChange: (date: Date | null) => void // NEW
}

const TaskDateTimeFields: React.FC<Props> = ({
  scheduleType,
  accentColor,
  startTime,
  endTime,
  dueDate,
  dueTime,
  scheduledDate,
  timeConflictError,
  onStartTimeChange,
  onEndTimeChange,
  onDueDateChange,
  onDueTimeChange,
  onScheduledDateChange,
}) => {
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showDueTimePicker, setShowDueTimePicker] = useState(false)
  const [showScheduledDatePicker, setShowScheduledDatePicker] = useState(false) // NEW

  if (scheduleType === ScheduleType.NONE) {
    return null
  }

  return (
    <>
      {/* DUE DATE FIELDS */}
      {scheduleType === ScheduleType.DAY && (
        <>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Due Date</Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.7}
            >
              <Text style={dueDate ? [styles.inputValue, { color: accentColor }] : styles.inputPlaceholder}>
                {dueDate
                  ? dueDate.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })
                  : 'Set due date'}
              </Text>
              <Ionicons name="calendar-outline" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>
              Due Time <Text style={styles.optionalText}>(Optional)</Text>
            </Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setShowDueTimePicker(true)}
              activeOpacity={0.7}
            >
              <Text style={dueTime ? [styles.inputValue, { color: accentColor }] : styles.inputPlaceholder}>
                {dueTime
                  ? dueTime.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })
                  : 'Set due time'}
              </Text>
              <Ionicons name="time-outline" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* TIME BLOCK FIELDS */}
      {scheduleType === ScheduleType.TIME && (
        <>
          {timeConflictError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                <Ionicons name="warning-outline" size={18} color="#991B1B" />
                {' '}{timeConflictError}
              </Text>
            </View>
          )}

          {/* NEW: Scheduled Date field */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>
              Date <Text style={styles.optionalText}>(Defaults to today)</Text>
            </Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setShowScheduledDatePicker(true)}
              activeOpacity={0.7}
            >
              <Text style={scheduledDate ? [styles.inputValue, { color: accentColor }] : styles.inputPlaceholder}>
                {scheduledDate
                  ? scheduledDate.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })
                  : 'Today'}
              </Text>
              <Ionicons name="calendar-outline" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Start Time</Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setShowStartPicker(true)}
              activeOpacity={0.7}
            >
              <Text style={startTime ? [styles.inputValue, { color: accentColor }] : styles.inputPlaceholder}>
                {startTime
                  ? startTime.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })
                  : 'Set start time'}
              </Text>
              <Ionicons name="time-outline" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>
              End Time <Text style={styles.optionalText}>(Optional)</Text>
            </Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setShowEndPicker(true)}
              activeOpacity={0.7}
            >
              <Text style={endTime ? [styles.inputValue, { color: accentColor }] : styles.inputPlaceholder}>
                {endTime
                  ? endTime.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })
                  : 'Set end time'}
              </Text>
              <Ionicons name="time-outline" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* DATE PICKERS */}
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={dueDate || new Date()}
          onChange={(_, date) => {
            setShowDatePicker(false)
            if (date) onDueDateChange(date)
          }}
        />
      )}

      {showDueTimePicker && (
        <DateTimePicker
          mode="time"
          value={dueTime || new Date()}
          onChange={(_, date) => {
            setShowDueTimePicker(false)
            if (date) onDueTimeChange(date)
          }}
        />
      )}

      {/* NEW: Scheduled Date Picker */}
      {showScheduledDatePicker && (
        <DateTimePicker
          mode="date"
          value={scheduledDate || new Date()}
          onChange={(_, date) => {
            setShowScheduledDatePicker(false)
            if (date) onScheduledDateChange(date)
          }}
        />
      )}

      {showStartPicker && (
        <DateTimePicker
          mode="time"
          value={startTime || new Date()}
          onChange={(_, date) => {
            setShowStartPicker(false)
            if (date) onStartTimeChange(date)
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          mode="time"
          value={endTime || new Date()}
          onChange={(_, date) => {
            setShowEndPicker(false)
            if (date) onEndTimeChange(date)
          }}
        />
      )}
    </>
  )
}

export default TaskDateTimeFields

const styles = StyleSheet.create({
  fieldGroup: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily:'PlayFair',
    color: '#9CA3AF',
    marginBottom: 12,
  },
  optionalText: {
    fontSize: 14,
    fontFamily:'PlayFair',
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
  inputValue: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  inputPlaceholder: {
    fontSize: 18,
    color: '#D1D5DB',
    flex: 1,
    fontFamily:'PlayFairBold',
  },
  inputIcon: {
    fontSize: 20,
    marginLeft: 8,
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
    fontFamily:'PlayFairBold',
    textAlign: 'center',
  },
})