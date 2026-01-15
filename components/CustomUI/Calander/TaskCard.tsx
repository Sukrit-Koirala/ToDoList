import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RoundedRectangle from '../RoundedRectangle/RoundedRectangle'

interface TaskCardProps {
    title: string,
    description?: string, // for extra
    startHour: number,
    startMinute?: number, // default 0
    durationMinutes?: number, //default 60
}


const TaskCard: React.FC<TaskCardProps> = ({ title, description, startHour, startMinute = 0, durationMinutes = 60 }) => {
  const SLOT_HEIGHT = 80 // same as your TimeSlot height
  const totalMinutes = startHour * 60 + startMinute
  const top = (totalMinutes / 60) * SLOT_HEIGHT // each hour slot height
  const height = (durationMinutes / 60) * SLOT_HEIGHT

  return (
    <View style={[styles.container, { top, height }]}>
      <RoundedRectangle radius={10} backgroundColor='#4a90e2'>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </RoundedRectangle>
    </View>
  )
}


export default TaskCard

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: '#4a90e2',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
  },
})