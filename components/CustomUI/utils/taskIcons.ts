import { Ionicons } from '@expo/vector-icons'

export type TaskIconName = keyof typeof Ionicons.glyphMap

const ICON_MAP: Record<string, TaskIconName> = {
  gym: 'barbell',
  workout: 'fitness',
  meeting: 'people',
  call: 'call',
  study: 'book',
  code: 'code-slash',
  class: 'school',
  sleep: 'moon',
  coffee: 'cafe',
  lunch: 'fast-food',
  dinner: 'restaurant',
  email: 'mail',
  grocery: 'cart',
  travel: 'airplane',
  meditate: 'leaf',
  morning: 'sunny',
  school: 'school'
}

export const getTaskIcon = (title: string): TaskIconName => {
  if (!title) return 'checkmark'

  const firstWord = title.trim().split(' ')[0].toLowerCase()
  return ICON_MAP[firstWord] ?? 'checkbox'
}
