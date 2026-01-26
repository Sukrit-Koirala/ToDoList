import { useMemo, useRef, useState, useCallback } from 'react'
import {
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native'
import { Todo } from '../../../../types/todos'
import {
  calculateWindowStartMinute,
  buildTimedTodos,
  buildVisibleHours,
  filterVisibleTodos,
  HOURS_TO_SHOW,
} from './timeContainer.logic'

const HOUR_HEIGHT = 80
const BUFFER_HOURS = 4
const BUFFER_HEIGHT = BUFFER_HOURS * HOUR_HEIGHT
const MIDDLE_POSITION = BUFFER_HEIGHT

export const useTimeContainerLogic = (
  todos: Todo[],
  selectedDate: Date
) => {
  const scrollViewRef = useRef<ScrollView>(null)
  const lastScrollY = useRef(MIDDLE_POSITION)
  const isResetting = useRef(false)
  const accumulatedOffset = useRef(0)

  const currentHour = new Date().getHours()
  const [hourOffset, setHourOffset] = useState(currentHour)

  const windowStartMinute = useMemo(
    () => calculateWindowStartMinute(hourOffset),
    [hourOffset]
  )

  const timedTodos = useMemo(
    () => buildTimedTodos(todos, selectedDate),
    [todos, selectedDate]
  )

  const visibleHours = useMemo(
    () => {
      const hours = buildVisibleHours(windowStartMinute)
      console.log('📅 Visible Hours:', hours.map(h => h.label).join(', '))
      return hours
    },
    [windowStartMinute]
  )

  const visibleTodos = useMemo(
    () => filterVisibleTodos(timedTodos, windowStartMinute),
    [timedTodos, windowStartMinute]
  )

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isResetting.current) return

      const scrollY = e.nativeEvent.contentOffset.y
      const deltaY = scrollY - lastScrollY.current
      
      accumulatedOffset.current += deltaY

      const absAccumulated = Math.abs(accumulatedOffset.current)
      const hoursScrolled = Math.floor(absAccumulated / HOUR_HEIGHT)
      
      if (hoursScrolled > 0) {
        const direction = accumulatedOffset.current > 0 ? 1 : -1
        
        isResetting.current = true
        
        const remainingOffset = accumulatedOffset.current % HOUR_HEIGHT
        
        setHourOffset(prev => {
          const newOffset = (prev + (hoursScrolled * direction) + 24) % 24
          console.log(`Hour offset: ${prev} → ${newOffset}`)
          return newOffset
        })
        
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ 
            y: MIDDLE_POSITION + remainingOffset, 
            animated: false 
          })
          lastScrollY.current = MIDDLE_POSITION + remainingOffset
          accumulatedOffset.current = remainingOffset
          isResetting.current = false
        }, 0)
      } else {
        lastScrollY.current = scrollY
      }
    },
    []
  )

  return {
    scrollViewRef,
    visibleHours,
    visibleTodos,
    onScroll,
    hourOffset,
    windowStartMinute,
  }
}