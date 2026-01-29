import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import RoundedRectangle from '../RoundedRectangle/RoundedRectangle'
import { Ionicons } from '@expo/vector-icons'
import { Habit, HabitCompletion } from '../../../types/habits'

export interface HabitCardProps {
  habit: Habit
  onToggle: (habitId: string, date: string) => void
  daysToShow?: number
}

const HabitCard = ({ habit, onToggle, daysToShow = 365 }: HabitCardProps) => {
  // Generate array of last N days
  const getDaysArray = (days: number): string[] => {
    const result: string[] = []
    const today = new Date()
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      result.push(`${year}-${month}-${day}`)
    }
    
    return result
  }

  const days = getDaysArray(daysToShow)
  
  // Check if date is completed
  const isCompleted = (date: string): boolean => {
    const completion = habit.completions.find(c => c.date === date)
    return completion?.completed || false
  }

  // Format info text (e.g., "Mon, Wed, Sat  •  15 min")
  const getInfoText = (): string => {
    if (habit.description) return habit.description
    return `${habit.currentStreak} day streak`
  }

  return (
    <View style={styles.wrapper}>
      <RoundedRectangle
        backgroundColor="#2C2C2E"
        radius={16}
        style={styles.card}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{habit.title}</Text>
              <View style={[styles.iconContainer, { backgroundColor: habit.color }]}>
                <Ionicons name={habit.icon as any} size={24} color="#fff" />
              </View>
            </View>
            <Text style={styles.info}>{getInfoText()}</Text>
          </View>

          {/* Completion Grid */}
          <View style={styles.grid}>
            {days.map((date, index) => {
              const completed = isCompleted(date)
              const isToday = date === days[days.length - 1]
              
              return (
                <Pressable
                  key={date}
                  onPress={() => onToggle(habit.id, date)}
                  style={[
                    styles.gridItem,
                    completed && { backgroundColor: habit.color },
                    !completed && styles.gridItemEmpty,
                    isToday && styles.gridItemToday,
                  ]}
                />
              )
            })}
          </View>
        </View>
      </RoundedRectangle>
    </View>
  )
}

export default HabitCard

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },

  card: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  content: {
    gap: 12,
  },

  header: {
    gap: 4,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  info: {
    color: '#8E8E93',
    fontSize: 14,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },

  gridItem: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },

  gridItemEmpty: {
    backgroundColor: '#3A3A3C',
  },

  gridItemToday: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
})