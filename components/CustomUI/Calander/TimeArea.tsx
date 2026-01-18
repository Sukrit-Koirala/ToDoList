import { StyleSheet, View } from 'react-native'
import React from 'react'
import RoundedRectangle from '../RoundedRectangle/RoundedRectangle'
import TimeSlot from './TimeSlot'
import TaskCard from './TaskCard'
import { useTheme } from '../../../hooks/useTheme'

const HOURS = [
  '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM',
  '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM',
  '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '12 AM',
  '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM',
]

const tasks = [
  { title: 'Meeting', startHour: 1, startMinute: 0, durationMinutes: 60,description:"Team sync-up",active:true },
  { title: 'Workout', startHour: 2, startMinute: 30, durationMinutes: 30 },
  { title: 'Dinner', startHour: 4, startMinute: 0, durationMinutes: 15 },
]

const TimeCard = () => {
  const {theme} = useTheme();
  return (
    <View>
      <RoundedRectangle radius={20} style={[styles.body,{backgroundColor:theme.calendarThemes.calendarBackground}]}>
        {HOURS.map((hour) => (
          <TimeSlot key={hour} label={hour} />
        ))}

        {/* Render tasks dynamically */}
        {tasks.map((task, i) => (
          <TaskCard key={i} {...task} />
        ))}
      </RoundedRectangle>
    </View>
  )
}

export default TimeCard

const styles = StyleSheet.create({
  body: {
    paddingVertical: 32,
    position: 'relative', // needed for absolute TaskCard
  },
  card:{
    marginRight: 8,
  }
})
