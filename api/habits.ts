// api/habits.ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Habit, HabitCompletion, HabitStats, getHabitIcon } from '../types/habits'
import { getDefaultHabits } from '../constants/defaultHabits' // CHANGED: import function instead of constant
import { ThemeType } from '../data/themes'

export type { Habit, HabitCompletion } from '../types/habits'

const HABITS_KEY = 'HABITS_V2'

/* ---------- Internal Helpers ---------- */

const readHabits = async (): Promise<Habit[]> => {
  const raw = await AsyncStorage.getItem(HABITS_KEY)
  if (!raw) return []

  try {
    return JSON.parse(raw) as Habit[]
  } catch {
    return []
  }
}

const writeHabits = async (habits: Habit[]) => {
  await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits))
}

const getTodayDate = (): string => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const calculateStreak = (completions: HabitCompletion[]): { current: number; longest: number } => {
  if (completions.length === 0) return { current: 0, longest: 0 }

  // Sort by date descending
  const sorted = [...completions]
    .filter(c => c.completed)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Calculate current streak (from today backwards)
  for (let i = 0; i < sorted.length; i++) {
    const completionDate = new Date(sorted[i].date)
    completionDate.setHours(0, 0, 0, 0)
    
    const expectedDate = new Date(today)
    expectedDate.setDate(today.getDate() - i)
    expectedDate.setHours(0, 0, 0, 0)

    if (completionDate.getTime() === expectedDate.getTime()) {
      currentStreak++
    } else {
      break
    }
  }

  // Calculate longest streak
  let currentDate: Date | null = null
  for (const completion of sorted) {
    const completionDate = new Date(completion.date)
    completionDate.setHours(0, 0, 0, 0)

    if (!currentDate) {
      tempStreak = 1
    } else {
      const dayDiff = Math.floor((currentDate.getTime() - completionDate.getTime()) / (1000 * 60 * 60 * 24))
      if (dayDiff === 1) {
        tempStreak++
      } else {
        longestStreak = Math.max(longestStreak, tempStreak)
        tempStreak = 1
      }
    }

    currentDate = completionDate
  }
  longestStreak = Math.max(longestStreak, tempStreak)

  return { current: currentStreak, longest: longestStreak }
}

/* ---------- API Functions ---------- */

// CHANGED: Added themeColors parameter
export const getHabits = async (theme?: ThemeType): Promise<Habit[]> => {
  const raw = await AsyncStorage.getItem(HABITS_KEY)

  // FIRST LAUNCH → seed defaults with theme colors
  if (!raw) {
    const defaultHabits = getDefaultHabits(theme)
    await writeHabits(defaultHabits)
    return defaultHabits
  }

  return JSON.parse(raw)
}

export const getHabit = async (id: string): Promise<Habit | null> => {
  const habits = await readHabits()
  return habits.find(h => h.id === id) || null
}

export const addHabit = async (params: {
  title: string
  description?: string
  icon?: string // Optional - will auto-detect if not provided
  color: string
}): Promise<Habit> => {
  const habits = await readHabits()

  const newHabit: Habit = {
    id: Date.now().toString(),
    title: params.title,
    description: params.description,
    icon: params.icon || getHabitIcon(params.title),
    color: params.color,
    completions: [],
    currentStreak: 0,
    longestStreak: 0,
    createdAt: new Date().toISOString(),
    archived: false,
  }

  await writeHabits([...habits, newHabit])
  return newHabit
}

export const updateHabit = async (
  id: string,
  updates: Partial<Omit<Habit, 'id' | 'createdAt'>>
): Promise<void> => {
  const habits = await readHabits()
  
  const updated = habits.map(habit => {
    if (habit.id === id) {
      // Allow updating everything except id and createdAt
      return { ...habit, ...updates }
    }
    return habit
  })

  await writeHabits(updated)
}

export const deleteHabit = async (id: string): Promise<void> => {
  const habits = await readHabits()
  await writeHabits(habits.filter(h => h.id !== id))
}

export const toggleHabitCompletion = async (
  id: string,
  date: string = getTodayDate()
): Promise<void> => {
  const habits = await readHabits()
  
  const updated = habits.map(habit => {
    if (habit.id !== id) return habit

    const existingIndex = habit.completions.findIndex(c => c.date === date)
    let newCompletions: HabitCompletion[]

    if (existingIndex >= 0) {
      // Toggle existing completion
      newCompletions = habit.completions.map((c, idx) => 
        idx === existingIndex 
          ? { ...c, completed: !c.completed, timestamp: new Date().toISOString() }
          : c
      )
    } else {
      // Add new completion
      newCompletions = [
        ...habit.completions,
        {
          date,
          completed: true,
          timestamp: new Date().toISOString(),
        }
      ]
    }

    // Recalculate streaks
    const streaks = calculateStreak(newCompletions)

    return {
      ...habit,
      completions: newCompletions,
      currentStreak: streaks.current,
      longestStreak: streaks.longest,
    }
  })

  await writeHabits(updated)
}

export const getHabitCompletionForDate = (
  habit: Habit,
  date: string
): HabitCompletion | null => {
  return habit.completions.find(c => c.date === date) || null
}

export const getHabitStats = (habit: Habit, days: number = 30): HabitStats => {
  const now = new Date()
  const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
  
  const recentCompletions = habit.completions.filter(c => {
    const completionDate = new Date(c.date)
    return completionDate >= cutoffDate && c.completed
  })

  const lastCompleted = habit.completions
    .filter(c => c.completed)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]

  return {
    totalCompletions: recentCompletions.length,
    completionRate: (recentCompletions.length / days) * 100,
    currentStreak: habit.currentStreak,
    longestStreak: habit.longestStreak,
    lastCompleted: lastCompleted?.date,
  }
}

export const clearHabits = async (): Promise<void> => {
  await AsyncStorage.removeItem(HABITS_KEY)
}