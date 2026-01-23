import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

interface Props {
  accentColor: string
  canSubmit: boolean
  isSubmitting: boolean
  onCancel: () => void
  onSubmit: () => void
}

const TaskFormActions: React.FC<Props> = ({
  accentColor,
  canSubmit,
  isSubmitting,
  onCancel,
  onSubmit,
}) => {
  return (
    <View style={styles.actionButtons}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onCancel}
        activeOpacity={0.7}
      >
        <Ionicons name="close" size={26} color="#333" style={styles.backButtonIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.nextButton,
          { backgroundColor: accentColor },
          !canSubmit && styles.disabled,
        ]}
        disabled={!canSubmit}
        onPress={onSubmit}
        activeOpacity={0.8}
      >
        <Text style={styles.nextButtonText}>
          {isSubmitting ? 'Creating...' : 'Create'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default TaskFormActions

const styles = StyleSheet.create({
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
  backButtonIcon: {
    color: '#6B7280',
    alignSelf:'center',
    right:1,
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
})