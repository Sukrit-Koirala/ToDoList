import { useMemo, useRef, useCallback } from 'react'
import { ScrollView } from 'react-native'
import { Todo, ScheduleType } from '../../../../types/todos'
import { 
  DAY_START_MINUTES,
  getMinutesSinceStart,
  convertMinutesToHour,
  formatDateToYYYYMMDD
} from './helpers'

interface TimedTodo {
  id: string
  title: string
  description?: string
  startMinute: number
  startHour: number
  durationMinutes: number
  active: boolean
  originalTodo: Todo
}

export const useTimeContainerLogic = (todos: Todo[], selectedDate: Date) => {
  const scrollViewRef = useRef<ScrollView>(null)

  // Process todos into timed tasks
  const timedTodos = useMemo(() => {
    const selectedDateStr = formatDateToYYYYMMDD(selectedDate)
    
    const filtered = todos.filter(todo => {
      if (todo.scheduleType !== ScheduleType.TIME || !todo.startTime || !todo.endTime) {
        return false
      }

      if (todo.scheduledDate) {
        return todo.scheduledDate === selectedDateStr
      }

      const startTimeDate = new Date(todo.startTime)
      const startDateStr = formatDateToYYYYMMDD(startTimeDate)
      return startDateStr === selectedDateStr
    })
    
    const mapped: TimedTodo[] = filtered.map(todo => {
      const start = getMinutesSinceStart(todo.startTime!)
      const end = getMinutesSinceStart(todo.endTime!)
      const startMinute = start - DAY_START_MINUTES
      
      let duration = end - start
      if (duration < 0) {
        duration = (24 * 60) - start + end
      }

      return {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        startMinute,
        startHour: convertMinutesToHour(startMinute),
        durationMinutes: Math.max(duration, 15),
        active: !todo.completed,
        originalTodo: todo,
      }
    })
    
    return mapped.filter(task => task.startMinute >= 0)
  }, [todos, selectedDate])

  return {
    scrollViewRef,
    timedTodos,
  }
}