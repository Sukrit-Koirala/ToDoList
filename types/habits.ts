// types/habits.ts

export interface HabitCompletion {
  date: string // YYYY-MM-DD
  completed: boolean
  timestamp: string // ISO timestamp of when it was marked complete
}

export interface Habit {
  id: string
  title: string
  description?: string
  icon: string // Ionicon name
  color: string // Hex color for the habit
  
  // Completion tracking
  completions: HabitCompletion[] // Array of all completions
  
  // Streaks
  currentStreak: number
  longestStreak: number
  
  // Metadata
  createdAt: string
  archived: boolean
}

export interface HabitStats {
  totalCompletions: number
  completionRate: number // percentage
  currentStreak: number
  longestStreak: number
  lastCompleted?: string // date
}

// Map common habit names to Ionicons
export const getHabitIcon = (title: string): string => {
  const lowerTitle = title.toLowerCase()
  
  // Exercise & Fitness
  if (lowerTitle.includes('workout') || lowerTitle.includes('exercise') || lowerTitle.includes('gym')) return 'fitness'
  if (lowerTitle.includes('run') || lowerTitle.includes('jog')) return 'walk'
  if (lowerTitle.includes('yoga') || lowerTitle.includes('stretch')) return 'body'
  if (lowerTitle.includes('walk')) return 'walk'
  
  // Health & Wellness
  if (lowerTitle.includes('water') || lowerTitle.includes('drink') || lowerTitle.includes('hydrate')) return 'water'
  if (lowerTitle.includes('sleep') || lowerTitle.includes('rest')) return 'bed'
  if (lowerTitle.includes('meditat')) return 'leaf'
  if (lowerTitle.includes('vitamin') || lowerTitle.includes('supplement')) return 'medical'
  
  // Learning & Reading
  if (lowerTitle.includes('read') || lowerTitle.includes('book')) return 'book'
  if (lowerTitle.includes('learn') || lowerTitle.includes('study')) return 'school'
  if (lowerTitle.includes('write') || lowerTitle.includes('journal')) return 'create'
  if (lowerTitle.includes('code') || lowerTitle.includes('program')) return 'code-slash'
  
  // Productivity
  if (lowerTitle.includes('clean') || lowerTitle.includes('tidy')) return 'brush'
  if (lowerTitle.includes('work') || lowerTitle.includes('focus')) return 'briefcase'
  if (lowerTitle.includes('plan') || lowerTitle.includes('organize')) return 'calendar'
  
  // Social & Personal
  if (lowerTitle.includes('call') || lowerTitle.includes('phone')) return 'call'
  if (lowerTitle.includes('family') || lowerTitle.includes('friend')) return 'people'
  if (lowerTitle.includes('gratitude') || lowerTitle.includes('thankful')) return 'heart'
  
  // Money & Finance
  if (lowerTitle.includes('save') || lowerTitle.includes('money') || lowerTitle.includes('invest')) return 'cash'
  if (lowerTitle.includes('budget')) return 'wallet'
  
  // Food & Cooking
  if (lowerTitle.includes('cook') || lowerTitle.includes('meal')) return 'restaurant'
  if (lowerTitle.includes('eat') || lowerTitle.includes('food')) return 'fast-food'
  
  // Creative
  if (lowerTitle.includes('music') || lowerTitle.includes('practice')) return 'musical-notes'
  if (lowerTitle.includes('draw') || lowerTitle.includes('art')) return 'brush'
  if (lowerTitle.includes('photo')) return 'camera'
  
  // Default
  return 'checkmark-circle'
}