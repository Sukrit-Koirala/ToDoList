import { View, StyleSheet, ScrollView, NativeScrollEvent, NativeSyntheticEvent, PanResponder, TouchableOpacity } from 'react-native'
import React, { useMemo, useRef, useCallback, useState } from 'react'
import RoundedRectangle from '../../RoundedRectangle/RoundedRectangle'
import TimeSlot from './TimeSlot'
import TaskCard from './TaskCard'
import { useTheme } from '../../../../hooks/useTheme'
import { Todo, ScheduleType } from '../../../../types/todos'
import { useUpdateTodo } from '../../../../hooks/useTodoMutations'
import { 
  HOURS,
  REPEATED_HOURS,
  DAY_START_MINUTES,
  TOTAL_HOURS,
  HOUR_HEIGHT,
  SLOT_HEIGHT,
  MIDDLE_SECTION_OFFSET,
  getMinutesSinceStart,
  convertMinutesToHour,
  formatDateToYYYYMMDD
} from './helpers'

interface TimeCardProps {
  todos: Todo[]
  selectedDate: Date
}

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

interface RepeatedTodo extends Omit<TimedTodo, 'id'> {
  id: string
  originalId: string
}

/* ---------- Component ---------- */

const TimeContainer: React.FC<TimeCardProps> = ({ todos, selectedDate }) => {
  const { theme } = useTheme()
  const updateTodoMutation = useUpdateTodo()
  const scrollViewRef = useRef<ScrollView>(null)
  const isScrolling = useRef(false)
  
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [taskOffsets, setTaskOffsets] = useState<Record<string, number>>({})

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

  const repeatedTodos = useMemo(() => {
    const allTasks: RepeatedTodo[] = []
    for (let i = 0; i < 3; i++) {
      timedTodos.forEach(task => {
        allTasks.push({
          ...task,
          id: `${task.id}-repeat-${i}`,
          originalId: task.id,
          startHour: task.startHour + (i * TOTAL_HOURS),
        })
      })
    }
    return allTasks
  }, [timedTodos])

  // Drag gesture handler - only works when a task is selected
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => selectedTaskId !== null,
      onMoveShouldSetPanResponder: (_, gesture) => {
        // Only allow drag if task is selected and vertical movement
        return selectedTaskId !== null && Math.abs(gesture.dy) > 3
      },
      onPanResponderGrant: () => {
        // Disable scroll when starting to drag
        setIsDragging(true)
        scrollViewRef.current?.setNativeProps({ scrollEnabled: false })
      },
      onPanResponderMove: (_, gesture) => {
        if (selectedTaskId) {
          setTaskOffsets(prev => ({
            ...prev,
            [selectedTaskId]: gesture.dy
          }))
        }
      },
      onPanResponderRelease: (_, gesture) => {
        // Re-enable scroll
        scrollViewRef.current?.setNativeProps({ scrollEnabled: true })
        setIsDragging(false)
        
        if (!selectedTaskId) return

        const totalY = gesture.dy
        
        // Find the selected task
        const draggedTask = repeatedTodos.find(t => t.id === selectedTaskId)
        if (!draggedTask) {
          setSelectedTaskId(null)
          setTaskOffsets({})
          return
        }

        const initialTop = ((draggedTask.startHour * 60) / 60) * SLOT_HEIGHT
        
        // Calculate new start hour based on drag
        const newStartHour = Math.max(0, Math.round((initialTop + totalY) / SLOT_HEIGHT))
        
        // Snap to position
        const snappedY = newStartHour * SLOT_HEIGHT - initialTop
        
        // Animate to snapped position
        setTaskOffsets(prev => ({
          ...prev,
          [selectedTaskId]: snappedY
        }))

        // Update the task position in backend
        handlePositionChange(selectedTaskId, newStartHour)
        
        // Reset drag state and keep task selected
        setTimeout(() => {
          setTaskOffsets({})
        }, 200)
      },
    })
  ).current

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isScrolling.current || isDragging) return

    const yOffset = event.nativeEvent.contentOffset.y
    const contentHeight = TOTAL_HOURS * HOUR_HEIGHT

    if (yOffset < HOUR_HEIGHT) {
      isScrolling.current = true
      scrollViewRef.current?.scrollTo({
        y: yOffset + contentHeight,
        animated: false,
      })
      setTimeout(() => {
        isScrolling.current = false
      }, 50)
    }
    else if (yOffset > contentHeight * 2 - HOUR_HEIGHT) {
      isScrolling.current = true
      scrollViewRef.current?.scrollTo({
        y: yOffset - contentHeight,
        animated: false,
      })
      setTimeout(() => {
        isScrolling.current = false
      }, 50)
    }
  }, [isDragging])

  const handlePositionChange = (taskId: string, newStartHour: number) => {
    const originalId = taskId.includes('-repeat-') 
      ? taskId.split('-repeat-')[0] 
      : taskId

    const task = timedTodos.find(t => t.id === originalId)
    if (!task) return

    const duration = task.durationMinutes
    const normalizedHour = newStartHour % TOTAL_HOURS
    const newStartMinutes = (normalizedHour * 60) + DAY_START_MINUTES
    const newEndMinutes = newStartMinutes + duration

    const dateStr = formatDateToYYYYMMDD(selectedDate)
    const [year, month, day] = dateStr.split('-').map(Number)

    const startHours = Math.floor(newStartMinutes / 60) % 24
    const startMins = newStartMinutes % 60
    const endHours = Math.floor(newEndMinutes / 60) % 24
    const endMins = newEndMinutes % 60

    let endDay = day
    if (newEndMinutes >= 24 * 60) {
      endDay = day + 1
    }

    const newStartTime = new Date(year, month - 1, day, startHours, startMins).toISOString()
    const newEndTime = new Date(year, month - 1, endDay, endHours, endMins).toISOString()

    updateTodoMutation.mutate({
      id: originalId,
      updates: {
        startTime: newStartTime,
        endTime: newEndTime,
      },
    })
  }

  const handleTaskPress = (taskId: string) => {
    // Toggle selection
    if (selectedTaskId === taskId) {
      setSelectedTaskId(null)
    } else {
      setSelectedTaskId(taskId)
      setTaskOffsets({})
    }
  }

  const handleLayout = useCallback(() => {
    scrollViewRef.current?.scrollTo({
      y: MIDDLE_SECTION_OFFSET,
      animated: false,
    })
  }, [])

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={styles.scrollContainer}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      onLayout={handleLayout}
      scrollEnabled={!isDragging}
    >
      <RoundedRectangle
        radius={20}
        style={[
          styles.card,
          { backgroundColor: theme.calendarThemes.calendarBackground }
        ]}
      >
        <View style={styles.body} {...panResponder.panHandlers}>
          {REPEATED_HOURS.map((hour, index) => (
            <TimeSlot key={`${hour}-${index}`} label={hour} />
          ))}

          <View style={styles.tasksContainer}>
            {repeatedTodos.map(task => (
              <TouchableOpacity
                key={task.id}
                activeOpacity={1}
                onPress={() => handleTaskPress(task.id)}
              >
                <TaskCard
                  startHour={task.startHour}
                  title={task.title}
                  description={task.description}
                  durationMinutes={task.durationMinutes}
                  active={task.active}
                  offsetY={taskOffsets[task.id] || 0}
                  isSelected={selectedTaskId === task.id}
                />
              </TouchableOpacity>
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