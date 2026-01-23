import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { ScheduleType } from '../../../../types/todos'

interface Props {
  scheduleType: ScheduleType
  accentColor: string
  onScheduleTypeChange: (type: ScheduleType) => void
}

const scheduleOptions = [
  { label: 'None', value: ScheduleType.NONE },
  { label: 'Due Date', value: ScheduleType.DAY },
  { label: 'Time Block', value: ScheduleType.TIME },
]

const RADIUS = 16
const PADDING = 4


const TaskScheduleSelector: React.FC<Props> = ({
  scheduleType,
  accentColor,
  onScheduleTypeChange,
}) => {
  return (
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
            onPress={() => onScheduleTypeChange(option.value)}
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
  )
}

export default TaskScheduleSelector

const styles = StyleSheet.create({
  fieldGroup: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9CA3AF',
    marginBottom: 12,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: RADIUS,
    padding: PADDING,
    overflow: 'hidden', // 👈 prevents bleed on Android
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: RADIUS - PADDING, // 👈 inner pill
  },
  segmentFirst: {
    borderTopLeftRadius: RADIUS,
    borderBottomLeftRadius: RADIUS,
  },
  segmentLast: {
    borderTopRightRadius: RADIUS,
    borderBottomRightRadius: RADIUS,
  },
  segmentText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },
})
