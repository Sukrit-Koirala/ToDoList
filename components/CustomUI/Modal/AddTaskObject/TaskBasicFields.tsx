import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

interface Props {
  title: string
  description: string
  accentColor: string
  onTitleChange: (text: string) => void
  onDescriptionChange: (text: string) => void
}

const TaskBasicFields: React.FC<Props> = ({
  title,
  description,
  accentColor,
  onTitleChange,
  onDescriptionChange,
}) => {
  return (
    <>
      {/* TITLE */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Task Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.inputValue, { color: accentColor }]}
            placeholder="Enter task name"
            placeholderTextColor="#9CA3AF"
            value={title}
            onChangeText={onTitleChange}
            autoFocus
          />
        </View>
      </View>

      {/* DESCRIPTION */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Description</Text>
        <View style={[styles.inputContainer, styles.textAreaContainer]}>
          <TextInput
            style={[styles.inputValue, styles.textAreaValue, { color: accentColor }]}
            placeholder="Add details (Optional)"
            placeholderTextColor="#9CA3AF"
            value={description}
            onChangeText={onDescriptionChange}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </View>
    </>
  )
}

export default TaskBasicFields

const styles = StyleSheet.create({
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9CA3AF',
    marginBottom: 8,
    fontFamily:'PlayFair'
  },
  inputContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: "PlayFair"
  },
  textAreaContainer: {
    paddingVertical: 8,
    alignItems: 'flex-start',
  },
  inputValue: {
    fontSize: 18,
    flex: 1,
    fontWeight:600,
  
  },
  textAreaValue: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
})