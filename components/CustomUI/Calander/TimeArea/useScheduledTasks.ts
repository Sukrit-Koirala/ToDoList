// useScheduledTasks.ts
import { useState, useEffect, useMemo, useRef } from 'react'
import { getTodosByDate, Todo } from '../../../../api/todos'
import { ScheduleType } from '../../../../types/todos'

const PIXELS_PER_HOUR = 80

interface ScheduledTask {
  id: string
  title: string
  description?: string
  startMinute: number // absolute position in pixels from hour 0
  durationMinutes: number
  isVisible: boolean // whether task is in the viewable area
}

export const useScheduledTasks = (selectedDate: Date, hourOffset: number, visibleHoursCount: number = 24) => {
  const [scheduledTodos, setScheduledTodos] = useState<Todo[]>([])
  const renderCount = useRef(0)

  // Load todos for the selected date
  useEffect(() => {
    const loadTodos = async () => {
      const dateStr = selectedDate.toISOString().split('T')[0] // YYYY-MM-DD
      console.log('[useScheduledTasks] Loading todos for date:', dateStr)
      
      const todos = await getTodosByDate(dateStr)
      console.log('[useScheduledTasks] Fetched todos:', todos.length)
      
      // Filter only TIME scheduled todos with both startTime and endTime
      const timeTodos = todos.filter(
        todo => todo.scheduleType === ScheduleType.TIME && todo.startTime && todo.endTime
      )
      
      console.log('[useScheduledTasks] Filtered TIME todos:', timeTodos.length)
      setScheduledTodos(timeTodos)
    }
    
    loadTodos()
  }, [selectedDate])

  // Convert time string (either "HH:MM" or ISO timestamp) to minutes since midnight
  const timeToMinutes = (timeStr: string): number => {
    // Check if it's an ISO timestamp
    if (timeStr.includes('T')) {
      const date = new Date(timeStr)
      return date.getHours() * 60 + date.getMinutes()
    }
    
    // Otherwise treat as "HH:MM" format
    const [hours, minutes] = timeStr.split(':').map(Number)
    return hours * 60 + minutes
  }

  // Calculate ABSOLUTE position from midnight (not relative to offset)
  const getAbsolutePosition = (startTime: string): number => {
    const startMinutes = timeToMinutes(startTime)
    // Convert minutes to pixels from hour 0
    return (startMinutes / 60) * PIXELS_PER_HOUR
  }

  // Calculate relative position based on hourOffset
  const getRelativePosition = (absolutePosition: number): number => {
    const offsetPixels = hourOffset * PIXELS_PER_HOUR
    return absolutePosition - offsetPixels
  }

  // Check if task is viewable in the current visible window
  const isTaskVisible = (startTime: string, endTime: string): boolean => {
    const startMinutes = timeToMinutes(startTime)
    const endMinutes = timeToMinutes(endTime)
    
    // Visible window boundaries (in minutes since midnight)
    const visibleStartMinutes = hourOffset * 60
    const visibleEndMinutes = visibleStartMinutes + (visibleHoursCount * 60)
    
    // Task is visible if it overlaps with the visible window
    const taskEndsAfterViewStart = endMinutes > visibleStartMinutes
    const taskStartsBeforeViewEnd = startMinutes < visibleEndMinutes
    
    return taskEndsAfterViewStart && taskStartsBeforeViewEnd
  }

  // Transform todos into scheduled tasks with calculated positions
  const scheduledTasks: ScheduledTask[] = useMemo(() => {
    renderCount.current++
    console.log('🔄 [useScheduledTasks] RECALCULATING (render #' + renderCount.current + ')', {
      hourOffset,
      visibleHoursCount,
      todosCount: scheduledTodos.length
    })
    
    const tasks = scheduledTodos
      .filter(todo => todo.startTime && todo.endTime)
      .map(todo => {
        const startMinutes = timeToMinutes(todo.startTime!)
        const endMinutes = timeToMinutes(todo.endTime!)
        const durationMinutes = endMinutes - startMinutes
        
        // Calculate absolute position from midnight
        const absolutePosition = getAbsolutePosition(todo.startTime!)
        
        // Calculate relative position based on current offset
        const relativePosition = getRelativePosition(absolutePosition)
        
        const isVisible = isTaskVisible(todo.startTime!, todo.endTime!)

        console.log(`Task "${todo.title}":`, {
          startTime: todo.startTime,
          startMinutes,
          absolutePosition,
          relativePosition,
          hourOffset,
          isVisible
        })

        return {
          id: todo.id,
          title: todo.title,
          description: todo.description,
          startMinute: relativePosition,
          durationMinutes,
          isVisible,
        }
      })
    
    console.log('[useScheduledTasks] Computed:', tasks.length, 'tasks, visible:', tasks.filter(t => t.isVisible).length)
    
    return tasks
  }, [scheduledTodos, hourOffset, visibleHoursCount])

  return { scheduledTasks }
}