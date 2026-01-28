import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import RoundedRectangle from '../../RoundedRectangle/RoundedRectangle'
import TimeSlot from './TimeSlot'
import DraggableTaskCard from './DraggableTaskCard'
import { useTheme } from '../../../../hooks/useTheme'
import { styles } from './TimeAreaStyle.styles'
import { getTodosByDate, Todo, scheduleTodoWithTime } from '../../../../api/todos'
import { ScheduleType } from '../../../../types/todos'

interface Props {
  selectedDate: Date
}

const PIXELS_PER_HOUR = 80
const HOURS = Array.from({ length: 24 }, (_, i) => i)

const TimeContainer: React.FC<Props> = ({ selectedDate }) => {
  const { theme } = useTheme()
  const [todos, setTodos] = useState<Todo[]>([])
  const scrollRef = useRef<ScrollView>(null)

  const loadTodos = async () => {
    const dateStr = selectedDate.toISOString().split('T')[0]
    const allTodos = await getTodosByDate(dateStr)
    const timeTodos = allTodos.filter(
      todo => todo.scheduleType === ScheduleType.TIME && todo.startTime && todo.endTime
    )
    setTodos(timeTodos)
  }

  useEffect(() => {
    loadTodos()
  }, [selectedDate])

  const timeToMinutes = (timeStr: string): number => {
    if (timeStr.includes('T')) {
      const date = new Date(timeStr)
      return date.getHours() * 60 + date.getMinutes()
    }
    const [hours, minutes] = timeStr.split(':').map(Number)
    return hours * 60 + minutes
  }

  const formatHour = (hour: number): string => {
    const isPM = hour >= 12
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour} ${isPM ? 'PM' : 'AM'}`
  }

  const minutesToTimeString = (minutes: number): string => {
    const hours = Math.floor(minutes / 60) % 24
    const mins = Math.floor(minutes % 60)
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
  }

  const handleTaskDrop = async (todoId: string, newStartMinutes: number, durationMinutes: number) => {
    const dateStr = selectedDate.toISOString().split('T')[0]
    const newStartTime = minutesToTimeString(newStartMinutes)
    const newEndTime = minutesToTimeString(newStartMinutes + durationMinutes)
    
    // Just save it, don't reload
    await scheduleTodoWithTime(todoId, newStartTime, newEndTime, dateStr)
    // Data will refresh when user switches dates or reopens the view
  }

  return (
    <View style={styles.scrollContainer}>
      <RoundedRectangle
        radius={20}
        style={[
          styles.card,
          { backgroundColor: theme.calendarThemes.calendarBackground },
        ]}
      >
        <ScrollView ref={scrollRef} style={styles.body} scrollEnabled={true}>
          <View style={{ position: 'relative' }}>
            {/* HOURS */}
            <View>
              {HOURS.map((hour) => (
                <TimeSlot
                  key={`hour-${hour}`}
                  label={formatHour(hour)}
                  height={PIXELS_PER_HOUR}
                />
              ))}
            </View>

            {/* TASKS */}
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
              }}
            >
              {todos.map(todo => {
                const startMinutes = timeToMinutes(todo.startTime!)
                const endMinutes = timeToMinutes(todo.endTime!)
                const durationMinutes = endMinutes - startMinutes
                const startMinute = (startMinutes / 60) * PIXELS_PER_HOUR

                return (
                  <DraggableTaskCard
                    key={todo.id}
                    todoId={todo.id}
                    title={todo.title}
                    description={todo.description}
                    startMinute={startMinute}
                    durationMinutes={durationMinutes}
                    pixelsPerHour={PIXELS_PER_HOUR}
                    onDrop={handleTaskDrop}
                    scrollRef={scrollRef}
                  />
                )
              })}
            </View>
          </View>
        </ScrollView>
      </RoundedRectangle>
    </View>
  )
}

export default TimeContainer