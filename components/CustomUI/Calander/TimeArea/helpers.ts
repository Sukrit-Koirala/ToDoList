export const HOURS = [
  '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM',
  '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM',
  '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '12 AM',
  '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM',
]

export const REPEATED_HOURS = [...HOURS, ...HOURS, ...HOURS]

export const DAY_START_MINUTES = 7 * 60
export const MINUTES_PER_HOUR = 60
export const HOUR_HEIGHT = 60
export const SLOT_HEIGHT = 80
export const TOTAL_HOURS = HOURS.length
export const MIDDLE_SECTION_OFFSET = TOTAL_HOURS * HOUR_HEIGHT


/* ---------- Helpers ---------- */

export const getMinutesSinceStart = (iso: string) => {
  const date = new Date(iso)
  return date.getHours() * 60 + date.getMinutes()
}

export const convertMinutesToHour = (minutes: number) => {
  return minutes / MINUTES_PER_HOUR
}

export const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}