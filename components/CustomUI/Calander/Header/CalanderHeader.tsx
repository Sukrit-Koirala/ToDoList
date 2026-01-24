import { StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import RoundedRectangle from '../../RoundedRectangle/RoundedRectangle'
import DateSlots from './DateSlots'

interface DateInfo {
  day: string
  date: number
  fullDate: Date
  isToday: boolean
  isCurrentMonth?: boolean
}

interface CalendarHeaderProps {
  isExpanded: boolean
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ isExpanded }) => {
  const dateData = useMemo(() => {
    const today = new Date()
    const currentDay = today.getDay()
    
    if (!isExpanded) {
      // Show current week only
      const monday = new Date(today)
      const diff = currentDay === 0 ? -6 : 1 - currentDay
      monday.setDate(today.getDate() + diff)

      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      
      return [days.map((day, index) => {
        const date = new Date(monday)
        date.setDate(monday.getDate() + index)
        
        return {
          day,
          date: date.getDate(),
          fullDate: date,
          isToday: date.toDateString() === today.toDateString(),
          isCurrentMonth: true,
        } as DateInfo
      })]
    } else {
      // Show full month
      const year = today.getFullYear()
      const month = today.getMonth()
      
      // Get first day of the month
      const firstDay = new Date(year, month, 1)
      const firstDayOfWeek = firstDay.getDay()
      
      // Calculate start date (Monday of the week containing the 1st)
      const startDate = new Date(firstDay)
      const diff = firstDayOfWeek === 0 ? -6 : 1 - firstDayOfWeek
      startDate.setDate(1 + diff)
      
      // Get last day of the month
      const lastDay = new Date(year, month + 1, 0)
      const lastDayOfWeek = lastDay.getDay()
      
      // Calculate end date (Sunday of the week containing the last day)
      const endDate = new Date(lastDay)
      const endDiff = lastDayOfWeek === 0 ? 0 : 7 - lastDayOfWeek
      endDate.setDate(lastDay.getDate() + endDiff)
      
      // Generate all dates
      const weeks: DateInfo[][] = []
      let currentDate = new Date(startDate)
      
      while (currentDate <= endDate) {
        const week: DateInfo[] = []
        for (let i = 0; i < 7; i++) {
          const date = new Date(currentDate)
          const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
          
          week.push({
            day: dayNames[date.getDay()],
            date: date.getDate(),
            fullDate: date,
            isToday: date.toDateString() === today.toDateString(),
            isCurrentMonth: date.getMonth() === month,
          })
          
          currentDate.setDate(currentDate.getDate() + 1)
        }
        weeks.push(week)
      }
      
      return weeks
    }
  }, [isExpanded])

  return (
    <View style={styles.container}>
      <RoundedRectangle 
        radius={20} 
        style={styles.headerContainer} 
        backgroundColor="transparent"
      >
        <View style={styles.content}>
          {dateData.map((week, weekIndex) => (
            <View key={weekIndex} style={styles.dateRow}>
              {week.map((dateInfo, dateIndex) => (
                <DateSlots
                  key={`${weekIndex}-${dateIndex}`}
                  day={dateInfo.day}
                  date={dateInfo.date}
                  active={dateInfo.isToday}
                  dimmed={isExpanded && !dateInfo.isCurrentMonth}
                />
              ))}
            </View>
          ))}
        </View>
      </RoundedRectangle>
    </View>
  )
}

export default CalendarHeader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
})