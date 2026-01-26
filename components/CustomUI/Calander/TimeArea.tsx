import { View, StyleSheet, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import RoundedRectangle from '../RoundedRectangle/RoundedRectangle'
import TimeSlot from './TimeSlot'
import TaskCard from './TaskCard'
import { useTheme } from '../../../hooks/useTheme'
import { Todo, ScheduleType } from '../../../types/todos'

const HOURS = [
  '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM',
  '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM',
  '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '12 AM',
  '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM',
]

const DAY_START_MINUTES = 7 * 60 // 7 AM
const MINUTES_PER_HOUR = 60

interface TimeCardProps {
  todos: Todo[]
  selectedDate: Date
}

/* ---------- Helpers ---------- */

const getMinutesSinceStart = (iso: string) => {
  const date = new Date(iso)
  return date.getHours() * 60 + date.getMinutes()
}

const convertMinutesToHour = (minutes: number) => {
  return minutes / MINUTES_PER_HOUR
}

const formatDateToYYYYMMDD = (date: Date): string => {
  // Use local date components to avoid timezone issues
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/* ---------- Component ---------- */

const TimeContainer: React.FC<TimeCardProps> = ({ todos, selectedDate }) => {
  const { theme } = useTheme()

  const timedTodos = useMemo(() => {
    const selectedDateStr = formatDateToYYYYMMDD(selectedDate)
    
    console.log('[TimeCard] Filtering for date:', selectedDateStr)
    console.log('[TimeCard] All todos:', todos)
    
    const filtered = todos.filter(todo => {
      // Must have TIME schedule type with start and end times
      if (todo.scheduleType !== ScheduleType.TIME || !todo.startTime || !todo.endTime) {
        return false
      }

      // Check if scheduledDate matches selected date
      if (todo.scheduledDate) {
        const matches = todo.scheduledDate === selectedDateStr
        console.log(`[TimeCard] "${todo.title}" scheduledDate=${todo.scheduledDate}, selected=${selectedDateStr}, matches=${matches}`)
        return matches
      }

      // Fallback: if no scheduledDate, check if startTime date matches
      const startTimeDate = new Date(todo.startTime)
      const startDateStr = formatDateToYYYYMMDD(startTimeDate)
      console.log(`[TimeCard] "${todo.title}" startTime date=${startDateStr}, selected=${selectedDateStr}`)
      return startDateStr === selectedDateStr
    })
    
    console.log('[TimeCard] Filtered todos count:', filtered.length)
    
    const mapped = filtered.map(todo => {
      const start = getMinutesSinceStart(todo.startTime!)
      const end = getMinutesSinceStart(todo.endTime!)
      const startMinute = start - DAY_START_MINUTES
      
      // Handle end time that might be earlier than start (crossing midnight)
      let duration = end - start
      if (duration < 0) {
        duration = (24 * 60) - start + end
      }

      console.log(`[TimeCard] "${todo.title}":`, {
        startTime: todo.startTime,
        endTime: todo.endTime,
        localStart: new Date(todo.startTime!).toLocaleTimeString(),
        localEnd: new Date(todo.endTime!).toLocaleTimeString(),
        startMinutes: start,
        endMinutes: end,
        startMinute,
        duration,
        startHour: convertMinutesToHour(startMinute),
      })

      return {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        startMinute,
        startHour: convertMinutesToHour(startMinute),
        durationMinutes: Math.max(duration, 15),
        active: !todo.completed,
      }
    })
    
    const afterFilter = mapped.filter(task => {
      const shouldShow = task.startMinute >= 0
      if (!shouldShow) {
        console.log(`[TimeCard] Filtering out task (before 7 AM): ${task.title}, startMinute=${task.startMinute}`)
      }
      return shouldShow
    })
    
    console.log('[TimeCard] Final tasks to render:', afterFilter)
    
    return afterFilter
  }, [todos, selectedDate])

  const handlePositionChange = (taskId: string, newStartHour: number) => {
    // Convert hour back to total minutes since midnight
    const newStartMinutes = newStartHour * 60
    const hours = Math.floor(newStartMinutes / 60) % 24
    const minutes = newStartMinutes % 60
    
    console.log('[TimeContainer] Task position changed:', {
      taskId,
      newStartHour,
      newStartMinutes,
      newTime: `${hours}:${String(minutes).padStart(2, '0')}`,
      formattedTime: `${hours > 12 ? hours - 12 : hours}:${String(minutes).padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`,
    })
    
    // TODO: Update the todo with new start/end times
    // You'll want to call your update function here
    // Example: updateTodo(taskId, { startTime: newStartTime, endTime: newEndTime })
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <RoundedRectangle
        radius={20}
        style={[
          styles.card,
          { backgroundColor: theme.calendarThemes.calendarBackground }
        ]}
      >
        <View style={styles.body}>
          {/* Time Grid */}
          {HOURS.map(hour => (
            <TimeSlot key={hour} label={hour} />
          ))}

          {/* Scheduled Tasks - Positioned Absolutely */}
          <View style={styles.tasksContainer}>
            {timedTodos.map(task => (
              <TaskCard
                key={task.id}
                startHour={task.startHour}
                title={task.title}
                description={task.description}
                durationMinutes={task.durationMinutes}
                active={task.active}
                onPositionChange={(newHour) => handlePositionChange(task.id, newHour)}
              />
            ))}
          </View>
        </View>
      </RoundedRectangle>
    </ScrollView>
  )
}

export default TimeContainer

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  body: {
    paddingVertical: 32,
    position: 'relative',
  },
  card: {
    marginRight: 8,
  },
  tasksContainer: {
    position: 'absolute',
    top: 32,
    left: 0,
    right: 0,
    bottom: 32,
  },
})