import { useMemo, useState } from 'react'
import { buildVisibleHours } from './timeContainer.logic'

export const useTimeContainerLogic = (selectedDate: Date) => {
  const currentHour = new Date().getHours()
  const [hourOffset, setHourOffset] = useState(currentHour)

  const visibleHours = useMemo(() => buildVisibleHours(hourOffset), [hourOffset])

  return { visibleHours, hourOffset }
}
