import React from 'react'
import { Text, StyleSheet } from 'react-native'

const TaskFormHeader: React.FC = () => {
  return <Text style={styles.title}>What's your task?</Text>
}

export default TaskFormHeader

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    color: '#111827',
    marginBottom: 32,
    marginTop: 8,
    fontFamily:'PlayFairBoldExtra'
  },
})