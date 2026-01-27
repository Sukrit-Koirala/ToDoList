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

const TimeContainer: React.FC<TimeCardProps> = ({ selectedDate }) => {
  const { theme } = useTheme()
  const { visibleHours } = useTimeContainerLogic(selectedDate)

const startY = useRef(0)

const panResponder = useRef(
  PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false, // ignore moves

    onPanResponderGrant: (_, gestureState) => {
      // record the starting Y
      startY.current = gestureState.y0
      console.log('📌 Touch started at:', startY.current)
    },

    onPanResponderRelease: (_, gestureState) => {
      // total drag distance
      const totalScroll = gestureState.moveY - startY.current
      console.log('✋ Touch ended / held. Total scroll:', totalScroll, 'pixels')
    },
  })
).current



  return (
    <View style={styles.scrollContainer} {...panResponder.panHandlers}>
      <RoundedRectangle
        radius={20}
        style={[styles.card, { backgroundColor: theme.calendarThemes.calendarBackground }]}
      >
        <View style={styles.body}>
          {visibleHours.map((hour, index) => (
            <TimeSlot key={index} label={hour.label} height={80} />
          ))}
        </View>
      </RoundedRectangle>
    </View>
  )
}

export default TimeContainer
