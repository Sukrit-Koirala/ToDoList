import { View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import RoundedRectangle from '../../RoundedRectangle/RoundedRectangle'
import TimeSlot from './TimeSlot'
import { useTheme } from '../../../../hooks/useTheme'
import { Todo } from '../../../../types/todos'
import { styles } from './TimeAreaStyle.styles'
import { useTimeContainerLogic } from './useTimeContainerLogic'

interface TimeCardProps {
  todos: Todo[]
  selectedDate: Date
}

const HOUR_HEIGHT = 80
const BUFFER_HOURS = 4
const BUFFER_HEIGHT = BUFFER_HOURS * HOUR_HEIGHT
const MIDDLE_POSITION = BUFFER_HEIGHT

const TimeContainer: React.FC<TimeCardProps> = ({
  todos,
  selectedDate,
}) => {
  const { theme } = useTheme()

  const {
    scrollViewRef,
    visibleHours,
    visibleTodos,
    onScroll,
    windowStartMinute,
  } = useTimeContainerLogic(todos, selectedDate)

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ 
        y: MIDDLE_POSITION, 
        animated: false 
      })
    }, 100)
  }, [])

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.scrollContainer}
      onScroll={onScroll}
      scrollEventThrottle={8}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <RoundedRectangle
        radius={20}
        style={[
          styles.card,
          { backgroundColor: theme.calendarThemes.calendarBackground },
        ]}
      >
        <View style={styles.body}>
          <View style={{ height: BUFFER_HEIGHT }} />
          
          {visibleHours.map(hour => (
            <TimeSlot
              key={hour.key}
              label={hour.label}
              height={HOUR_HEIGHT}
            />
          ))}
          
          <View style={{ height: BUFFER_HEIGHT }} />
        </View>
      </RoundedRectangle>
    </ScrollView>
  )
}

export default TimeContainer