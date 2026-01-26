import { Todo } from '../../../../types/todos'

export interface TimedTodo {
  id: string
  title: string
  description?: string
  startMinute: number
  durationMinutes: number
  active: boolean
  originalTodo: Todo
  relativeMinute?: number
}

export const HOURS_TO_SHOW = 8

export const calculateWindowStartMinute = (hourOffset: number): number => {
  const normalizedOffset = ((hourOffset % 24) + 24) % 24
  return normalizedOffset * 60
}

export const buildTimedTodos = (
  _todos: Todo[],
  _selectedDate: Date
): TimedTodo[] => {
  return []
}

export const buildVisibleHours = (
  windowStartMinute: number
): Array<{ key: string; label: string; hour: number }> => {
  const startHour = Math.floor(windowStartMinute / 60)

  return Array.from({ length: HOURS_TO_SHOW }, (_, i) => {
    const hour = (startHour + i) % 24

    const isPM = hour >= 12
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    const label = `${displayHour} ${isPM ? 'PM' : 'AM'}`

    return {
      key: `hour-${hour}`,
      label,
      hour,
    }
  })
}

export const filterVisibleTodos = (
  _todos: TimedTodo[],
  _windowStartMinute: number
) => {
  return []
}