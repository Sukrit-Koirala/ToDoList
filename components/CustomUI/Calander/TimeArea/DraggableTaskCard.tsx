import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import RoundedRectangle from '../../RoundedRectangle/RoundedRectangle'
import { Ionicons } from '@expo/vector-icons'
import { getTaskIcon } from '../../utils/taskIcons'

interface Props {
  todoId: string
  title: string
  description?: string
  startMinute: number // position in pixels from top
  durationMinutes: number
  pixelsPerHour: number
  onDrop: (todoId: string, newStartMinutes: number, durationMinutes: number) => void
  scrollRef: React.RefObject<any>
}

/* ---------- Constants ---------- */
const SLOT_HEIGHT = 80

/* ---------- Variant Config ---------- */
const VARIANT_CONFIG = {
  compact: {
    iconSize: 8,
    iconBox: 16,
    showDescription: false,
    paddingLeft: 2,
    titleSize: 14,
    rectBorder: 8,
    cardRoundness: 6,
  },
  medium: {
    iconSize: 20,
    iconBox: 32,
    showDescription: false,
    paddingLeft: 4,
    titleSize: 14,
    rectBorder: 16,
    cardRoundness: 12,
  },
  full: {
    iconSize: 32,
    iconBox: 48,
    showDescription: true,
    paddingLeft: 8,
    titleSize: 16,
    rectBorder: 32,
    cardRoundness: 20,
  },
} as const

/* ---------- Helpers ---------- */
const getVariant = (duration: number) => {
  if (duration <= 15) return 'compact'
  if (duration <= 30) return 'medium'
  return 'full'
}

const DraggableTaskCard: React.FC<Props> = ({
  todoId,
  title,
  description,
  startMinute,
  durationMinutes,
  pixelsPerHour,
  onDrop,
  scrollRef,
}) => {
  const position = useSharedValue(startMinute) // Animated position
  const translateY = useSharedValue(0)
  const isDragging = useSharedValue(false)

  // Sync position when startMinute changes (on date switch)
  React.useEffect(() => {
    position.value = startMinute
  }, [startMinute])

  const variant = getVariant(durationMinutes)
  const config = VARIANT_CONFIG[variant]
  const cardHeight = (durationMinutes / 60) * SLOT_HEIGHT
  const iconName = getTaskIcon(title)

  const enableScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.setNativeProps({ scrollEnabled: true })
    }
  }

  const disableScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.setNativeProps({ scrollEnabled: false })
    }
  }

  const gesture = Gesture.Pan()
    .activateAfterLongPress(500)
    .onBegin(() => {
      isDragging.value = true
      runOnJS(disableScroll)()
    })
    .onUpdate((e) => {
      // Calculate the new position based on drag
      const newPosition = position.value + e.translationY
      
      // Snap to 15-minute increments in real-time
      const minutesPerPixel = 60 / pixelsPerHour
      const newMinutes = Math.round((newPosition * minutesPerPixel) / 15) * 15
      
      // Clamp to valid range
      const clampedMinutes = Math.max(0, Math.min(1440 - durationMinutes, newMinutes))
      
      // Convert back to pixels for the snapped position
      const snappedPosition = (clampedMinutes / 60) * pixelsPerHour
      
      // Update translateY to show the snapped position
      translateY.value = snappedPosition - position.value
    })
    .onEnd(() => {
      // Calculate final position
      const finalPosition = position.value + translateY.value
      const minutesPerPixel = 60 / pixelsPerHour
      const finalMinutes = Math.round((finalPosition * minutesPerPixel) / 15) * 15
      const clampedMinutes = Math.max(0, Math.min(1440 - durationMinutes, finalMinutes))
      
      // Update base position to the new location
      position.value = (clampedMinutes / 60) * pixelsPerHour
      translateY.value = 0 // Reset translation since position is now updated
      
      isDragging.value = false
      runOnJS(enableScroll)()
      
      // Save to database
      runOnJS(onDrop)(todoId, clampedMinutes, durationMinutes)
    })
    .onFinalize(() => {
      isDragging.value = false
      runOnJS(enableScroll)()
    })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: position.value,
      transform: [{ translateY: translateY.value }],
      zIndex: isDragging.value ? 1000 : 1,
    }
  })

  const shadowStyle = useAnimatedStyle(() => {
    return {
      shadowColor: '#101010',
      shadowOffset: { width: 0, height: isDragging.value ? 10 : 6 },
      shadowOpacity: isDragging.value ? 0.35 : 0.25,
      shadowRadius: isDragging.value ? 15 : 10,
      elevation: isDragging.value ? 15 : 10,
    }
  })

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.cardWrapper,
          {
            height: cardHeight,
          },
          animatedStyle,
        ]}
      >
        <Animated.View style={[styles.shadowWrapper, shadowStyle]}>
          <RoundedRectangle radius={config.cardRoundness} backgroundColor="#ffffff">
            <View style={styles.row}>
              {/* Icon */}
              <View
                style={[
                  styles.iconContainer,
                  {
                    width: config.iconBox,
                    height: config.iconBox,
                    borderRadius: config.rectBorder,
                  },
                ]}
              >
                <Ionicons name={iconName} size={config.iconSize} color="#ffffff" />
              </View>

              {/* Text */}
              <View style={[styles.textContainer, { paddingLeft: config.paddingLeft }]}>
                <Text style={[styles.title, { fontSize: config.titleSize }]} numberOfLines={1}>
                  {title}
                </Text>

                {config.showDescription && description && (
                  <Text style={styles.description} numberOfLines={2}>
                    {description}
                  </Text>
                )}
              </View>
            </View>
          </RoundedRectangle>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  cardWrapper: {
    position: 'absolute',
    left: 70,
    right: 16,
    marginLeft: 8,
    width: '77%',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },

  shadowWrapper: {
    flex: 1,
    borderRadius: 12,
  },

  iconContainer: {
    marginLeft: 8,
    marginRight: 12,
    backgroundColor: '#101010',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#101010',
    fontWeight: '600',
  },

  description: {
    color: '#444',
    fontSize: 12,
    marginTop: 2,
  },
})

export default DraggableTaskCard