import { useEffect, useMemo, useState } from 'react'
import { buildVisibleHours } from './timeContainer.logic'

export const useTimeContainerLogic = (selectedDate: Date) => {
  const [hourOffset, setHourOffset] = useState(() => {
    const h = new Date(selectedDate).getHours()
    console.log('🟢 INIT hourOffset from date:', h)
    return h
  })

  useEffect(() => {
    const h = new Date(selectedDate).getHours()
    console.log('📅 selectedDate changed → reset hourOffset to:', h)
    setHourOffset(h)
  }, [selectedDate])

  const visibleHours = useMemo(() => {
    console.log('🔁 buildVisibleHours for hourOffset:', hourOffset)
    return buildVisibleHours(hourOffset)
  }, [hourOffset])

  return {
    visibleHours,
    hourOffset,
    setHourOffset,
  }
}
