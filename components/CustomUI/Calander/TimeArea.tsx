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
}

/* ---------- Helpers ---------- */

const getMinutesSinceStart = (iso: string) => {
  const date = new Date(iso)
  return date.getHours() * 60 + date.getMinutes()
}

const convertMinutesToHour = (minutes: number) => {
  return minutes / MINUTES_PER_HOUR
}

/* ---------- Component ---------- */

const TimeCard: React.FC<TimeCardProps> = ({ todos }) => {
  const { theme } = useTheme()

  const timedTodos = useMemo(() => {
    return todos
      .filter(
        todo =>
          todo.scheduleType === ScheduleType.TIME &&
          todo.startTime &&
          todo.endTime
      )
      .map(todo => {
        const start = getMinutesSinceStart(todo.startTime!)
        const end = getMinutesSinceStart(todo.endTime!)
        const startMinute = start - DAY_START_MINUTES

        return {
          id: todo.id,
          title: todo.title,
          description: todo.description,
          startMinute,
          startHour: convertMinutesToHour(startMinute),
          durationMinutes: Math.max(end - start, 15),
          active: !todo.completed,
        }
      })
      .filter(task => task.startMinute >= 0) // Filter out tasks before 7 AM
  }, [todos])

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
              />
            ))}
          </View>
        </View>
      </RoundedRectangle>
    </ScrollView>
  )
}

export default TimeCard

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