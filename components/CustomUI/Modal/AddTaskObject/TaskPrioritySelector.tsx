import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Priority } from '../../../../types/todos'

interface Props {
  priority: Priority
  accentColor: string
  onPriorityChange: (priority: Priority) => void
}

const RADIUS = 16

const priorityOptions = [
  { label: 'None', value: Priority.NONE },
  { label: 'Low', value: Priority.LOW },
  { label: 'High', value: Priority.HIGH },
]

const TaskPrioritySelector: React.FC<Props> = ({
  priority,
  accentColor,
  onPriorityChange,
}) => {
  return (
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
            onPress={() => onPriorityChange(option.value)}
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
  )
}

export default TaskPrioritySelector

const styles = StyleSheet.create({
  fieldGroup: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: 'PlayFair',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: RADIUS,
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: RADIUS - 4, // 👈 accounts for container padding
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
