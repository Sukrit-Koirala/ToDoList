export interface TimedTodo {
  id: string
  title: string
  description?: string
  startMinute: number
  durationMinutes: number
  active: boolean
  originalTodo?: any
  relativeMinute?: number
}

export const HOURS_TO_SHOW = 8

// Build visible hours based on continuous hour offset
export const buildVisibleHours = (hourOffset: number) => {
  return Array.from({ length: HOURS_TO_SHOW }, (_, i) => {
    const hour = hourOffset + i
    const hourForLabel = ((hour % 24) + 24) % 24 // wrap for display only
    const isPM = hourForLabel >= 12
    const displayHour = hourForLabel === 0 ? 12 : hourForLabel > 12 ? hourForLabel - 12 : hourForLabel
    return {
      key: `hour-${hour}`, // keep key continuous for smooth scrolling
      label: `${displayHour} ${isPM ? 'PM' : 'AM'}`,
      hour: hourForLabel,
    }
  })
}

// Placeholder for filtering todos
export const filterVisibleTodos = (todos: TimedTodo[], windowStartMinute: number) => {
  return todos.filter(
    t => t.startMinute >= windowStartMinute && t.startMinute < windowStartMinute + HOURS_TO_SHOW * 60
  )
}
