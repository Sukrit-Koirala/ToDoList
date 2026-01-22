import { StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import RoundedRectangle from '../../RoundedRectangle/RoundedRectangle'
import DateSlots from './DateSlots'

const CalendarHeader = () => {
  const weekDates = useMemo(() => {
    const today = new Date()
    const currentDay = today.getDay() // 0 = Sunday, 1 = Monday, etc.
    const monday = new Date(today)
    
    // Calculate the Monday of the current week
    const diff = currentDay === 0 ? -6 : 1 - currentDay
    monday.setDate(today.getDate() + diff)

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    
    return days.map((day, index) => {
      const date = new Date(monday)
      date.setDate(monday.getDate() + index)
      
      return {
        day,
        date: date.getDate(),
        fullDate: date,
        isToday: date.toDateString() === today.toDateString(),
      }
    })
  }, [])

  return (
    <RoundedRectangle 
      radius={20} 
      style={styles.headerContainer} 
      backgroundColor="transparent"
    >
      <View style={styles.dateRow}>
        {weekDates.map((dateInfo) => (
          <DateSlots
            key={dateInfo.day}
            day={dateInfo.day}
            date={dateInfo.date}
            active={dateInfo.isToday}
          />
        ))}
      </View>
    </RoundedRectangle>
  )
}

export default CalendarHeader

const styles = StyleSheet.create({
  headerContainer: {
    height: '45%',
    width: '100%',
    marginVertical: 104,
    paddingHorizontal: 8,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})