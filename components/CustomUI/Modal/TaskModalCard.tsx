import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { useTheme } from '../../../hooks/useTheme'
import RoundedRectangle from '../RoundedRectangle/RoundedRectangle'
import { useQueryClient } from '@tanstack/react-query'

interface TaskItemProps {
  index: number
  title: string
  completed: boolean
  time?: string
  duration?: string
  location?: string
  onToggle: () => void
}

const TaskItem: React.FC<TaskItemProps> = ({
  index,
  title,
  completed,
  time,
  duration,
  location,
  onToggle,
}) => {
  const { theme } = useTheme()
  const scale = useSharedValue(1)
  const queryClient = useQueryClient() 

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePress = () => {
    scale.value = withTiming(0.95, { duration: 50 }, () => {
      scale.value = withTiming(1, { duration: 100 })
    })
    onToggle()
  }

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={animatedStyle}>
        <RoundedRectangle
          radius={16}
          style={[
            styles.card,
            {
              backgroundColor: completed ? theme.background : '#FFFFFF',
              opacity: completed ? 0.4 : 1,
            },
          ]}
        >
          <View style={styles.row}>
            {/* NUMBER BADGE */}
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: completed ? '#1a1a1a' : '#F0F0F0',
                },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  {
                    color: completed ? '#FFFFFF' : '#1a1a1a',
                  },
                ]}
              >
                {index}
              </Text>
            </View>

            {/* CONTENT */}
            <View style={styles.content}>
              <View style={styles.titleRow}>
                <Text
                  style={[
                    styles.title,
                    {
                      textDecorationLine: completed
                        ? 'line-through'
                        : 'none',
                    },
                  ]}
                  numberOfLines={1}
                >
                  {title}
                </Text>
                {time && (
                  <Text style={styles.time}>{time}</Text>
                )}
              </View>

              {(duration || location) && (
                <View style={styles.metaRow}>
                  {duration && (
                    <Text style={styles.meta}>{duration}</Text>
                  )}
                  {duration && location && (
                    <Text style={styles.metaDot}>•</Text>
                  )}
                  {location && (
                    <Text style={styles.meta}>{location}</Text>
                  )}
                </View>
              )}
            </View>
          </View>
        </RoundedRectangle>
      </Animated.View>
    </Pressable>
  )
}

export default TaskItem

const taskStyles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },

  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  },

  content: {
    flex: 1,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 12,
    marginTop:5,
  },

  time: {
    fontSize: 14,
    color: '#666',
    fontWeight: '400',
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  meta: {
    fontSize: 13,
    color: '#888',
  },

  metaDot: {
    fontSize: 13,
    color: '#888',
  },
})

const styles = taskStyles