import React, { useRef } from 'react'
import { View, PanResponder } from 'react-native'
import RoundedRectangle from '../../RoundedRectangle/RoundedRectangle'
import TimeSlot from './TimeSlot'
import { useTheme } from '../../../../hooks/useTheme'
import { styles } from './TimeAreaStyle.styles'
import { useTimeContainerLogic } from './useTimeContainerLogic'

interface TimeCardProps {
  selectedDate: Date
}

const PIXELS_PER_HOUR = 80
const SENSITIVITY = 1

const TimeContainer: React.FC<TimeCardProps> = ({ selectedDate }) => {
  const { theme } = useTheme()
  const { visibleHours, hourOffset, setHourOffset } =
    useTimeContainerLogic(selectedDate)

  const lastY = useRef(0)
  const scrollOffset = useRef(0)

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: (_, g) => {
        lastY.current = g.y0 // Use y0 (initial touch position) instead of moveY
        scrollOffset.current = 0
      },

      onPanResponderMove: (_, g) => {
        const dy = g.moveY - lastY.current
        lastY.current = g.moveY

        scrollOffset.current += dy * SENSITIVITY

        const hoursDelta = Math.trunc(
          scrollOffset.current / PIXELS_PER_HOUR
        )

        if (hoursDelta !== 0) {
          setHourOffset(prev => prev - hoursDelta)
          scrollOffset.current -= hoursDelta * PIXELS_PER_HOUR
        }
      },

      onPanResponderRelease: () => {
        console.log('✋ Gesture END')
      },
    })
  ).current

  return (
    <View style={styles.scrollContainer} {...panResponder.panHandlers}>
      <RoundedRectangle
        radius={20}
        style={[
          styles.card,
          { backgroundColor: theme.calendarThemes.calendarBackground },
        ]}
      >
        <View style={styles.body}>
          {visibleHours.map(hour => (
            <TimeSlot
              key={hour.key}
              label={hour.label}
              height={PIXELS_PER_HOUR}
            />
          ))}
        </View>
      </RoundedRectangle>
    </View>
  )
}

export default TimeContainer