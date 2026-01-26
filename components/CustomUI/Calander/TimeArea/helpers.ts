export const DAY_START_MINUTES = 7 * 60
export const MINUTES_PER_HOUR = 60
export const HOUR_HEIGHT = 60
export const SLOT_HEIGHT = 80
export const TOTAL_HOURS = 24

/* ---------- Time Helpers ---------- */

export const getMinutesSinceStart = (iso: string) => {
  const date = new Date(iso)
  return date.getHours() * 60 + date.getMinutes()
}

export const getHourIndex = (minutes: number) => {
  return Math.floor(minutes / 60)
}

export const getMinuteWithinHour = (minutes: number) => {
  return minutes % 60
}

export const formatHourLabel = (minute: number) => {
  const normalized = ((minute % 1440) + 1440) % 1440
  const hour = Math.floor(normalized / 60)

  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 === 0 ? 12 : hour % 12

  return `${displayHour} ${period}`
}

export const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
