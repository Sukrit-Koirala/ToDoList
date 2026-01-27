// TimeContainer.tsx
import React, { useRef } from 'react'
import { View, PanResponder, Animated } from 'react-native'
import RoundedRectangle from '../../RoundedRectangle/RoundedRectangle'
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
  const animatedY = useRef(new Animated.Value(0)).current

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: (_, g) => {
        lastY.current = g.y0
        scrollOffset.current = 0
      },

      onPanResponderMove: (_, g) => {
        const dy = g.moveY - lastY.current
        lastY.current = g.moveY

        scrollOffset.current += dy * SENSITIVITY
        
        // Update animated value for visual feedback
        animatedY.setValue(scrollOffset.current)

        const hoursDelta = Math.trunc(
          scrollOffset.current / PIXELS_PER_HOUR
        )

        if (hoursDelta !== 0) {
          setHourOffset(prev => prev - hoursDelta)
          scrollOffset.current -= hoursDelta * PIXELS_PER_HOUR
          animatedY.setValue(scrollOffset.current)
        }
      },

      onPanResponderRelease: () => {
        console.log('✋ Gesture END')
        // Snap back to zero
        Animated.spring(animatedY, {
          toValue: 0,
          useNativeDriver: true,
        }).start()
        scrollOffset.current = 0
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
        <Animated.View 
          style={[
            styles.body,
            {
              transform: [{ translateY: animatedY }]
            }
          ]}
        >
          {visibleHours.map(hour => {
            const { Component, key, label } = hour
            return (
              <Component
                key={key}
                label={label}
                height={PIXELS_PER_HOUR}
              />
            )
          })}
        </Animated.View>
      </RoundedRectangle>
    </View>
  )
}

export default TimeContainer