import { View, ScrollView } from 'react-native'
import React from 'react'
import RoundedRectangle from '../../RoundedRectangle/RoundedRectangle'
import TimeSlot from './TimeSlot'
import TaskCard from './TaskCard'
import { useTheme } from '../../../../hooks/useTheme'
import { Todo } from '../../../../types/todos'
import { HOURS } from './helpers'
import { styles } from './TimeAreaStyle.styles'
import { useTimeContainerLogic } from './useTimeContainerLogic'

interface TimeCardProps {
  todos: Todo[]
  selectedDate: Date
}

/* ---------- Component ---------- */

const TimeContainer: React.FC<TimeCardProps> = ({ todos, selectedDate }) => {
  const { theme } = useTheme()
  const { scrollViewRef, timedTodos } = useTimeContainerLogic(todos, selectedDate)

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={styles.scrollContainer}
    >
      <RoundedRectangle
        radius={20}
        style={[
          styles.card,
          { backgroundColor: theme.calendarThemes.calendarBackground }
        ]}
      >
        <View style={styles.body}>
          {HOURS.map((hour, index) => (
            <TimeSlot key={`${hour}-${index}`} label={hour} />
          ))}

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

export default TimeContainer