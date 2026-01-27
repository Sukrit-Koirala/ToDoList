// timeContainer.logic.ts
import React from 'react'
import TimeSlot from './TimeSlot'
// Import your other slot components here when you create them
// import WorkTimeSlot from './WorkTimeSlot'
// import EveningTimeSlot from './EveningTimeSlot'

export const HOURS_TO_SHOW = 8

export const buildVisibleHours = (hourOffset: number) => {
  console.log('🛠 buildVisibleHours() called with hourOffset:', hourOffset)

  return Array.from({ length: HOURS_TO_SHOW }, (_, i) => {
    const hour = hourOffset + i
    const wrapped = ((hour % 24) + 24) % 24

    const isPM = wrapped >= 12
    const displayHour =
      wrapped === 0
        ? 12
        : wrapped > 12
        ? wrapped - 12
        : wrapped

    const label = `${displayHour} ${isPM ? 'PM' : 'AM'}`
    
    // Choose component based on your logic
    // Example: work hours (9 AM - 5 PM) get a different component
    // const Component = wrapped >= 9 && wrapped < 17 ? WorkTimeSlot : TimeSlot
    
    // For now, just use TimeSlot for all hours
    const Component = TimeSlot

    return {
      key: `hour-${hour}`,
      hour: wrapped,
      label,
      Component,
    }
  })
}