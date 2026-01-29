// data/defaultHabits.ts
import { ThemeType } from '../data/themes'
import { Habit } from '../types/habits'

export const getDefaultHabits = (theme?: ThemeType): Habit[] => {
  const bgColor = theme?.background || '#FFFFFF'

  return [
    {
      id: 'habit_1',
      title: 'Read a book',
      description: 'Mon, Wed, Sat  •  15 min',
      icon: 'book',
      color: bgColor,
      completions: [],
      currentStreak: 0,
      longestStreak: 0,
      createdAt: new Date().toISOString(),
      archived: false,
    },
    {
      id: 'habit_2',
      title: 'Morning Workout',
      description: 'Everyday  •  30 min',
      icon: 'fitness',
      color: bgColor,
      completions: [],
      currentStreak: 0,
      longestStreak: 0,
      createdAt: new Date().toISOString(),
      archived: false,
    },
    {
      id: 'habit_3',
      title: 'Drink Water',
      description: 'Everyday  •  8 glasses',
      icon: 'water',
      color: bgColor,
      completions: [],
      currentStreak: 0,
      longestStreak: 0,
      createdAt: new Date().toISOString(),
      archived: false,
    },
    {
      id: 'habit_4',
      title: 'Invest & grow',
      description: '2 days per month',
      icon: 'cash',
      color: bgColor,
      completions: [],
      currentStreak: 0,
      longestStreak: 0,
      createdAt: new Date().toISOString(),
      archived: false,
    },
    {
      id: 'habit_5',
      title: 'Meditate',
      description: 'Everyday  •  10 min',
      icon: 'leaf',
      color: bgColor,
      completions: [],
      currentStreak: 0,
      longestStreak: 0,
      createdAt: new Date().toISOString(),
      archived: false,
    },
  ]
}

// For backward compatibility
export const DEFAULT_HABITS = getDefaultHabits()