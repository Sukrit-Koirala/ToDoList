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

    return {
      key: `hour-${hour}`,
      hour: wrapped,
      label: `${displayHour} ${isPM ? 'PM' : 'AM'}`,
    }
  })
}
