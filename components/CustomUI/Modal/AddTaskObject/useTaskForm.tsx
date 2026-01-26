import { useState } from 'react'
import { Priority, ScheduleType } from '../../../../types/todos'

interface ExistingTodo {
  scheduleType: ScheduleType
  startTime?: string
  endTime?: string
  scheduledDate?: string // NEW
}

export const useTaskForm = (
  existingTodos: ExistingTodo[],
  onAdd: (data: any) => void
) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>(Priority.NONE)
  const [scheduleType, setScheduleType] = useState<ScheduleType>(ScheduleType.NONE)
  
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)
  const [dueDate, setDueDate] = useState<Date | null>(null)
  const [dueTime, setDueTime] = useState<Date | null>(null)
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null) // NEW
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeConflictError, setTimeConflictError] = useState<string | null>(null)

  const checkTimeConflict = (newStart: Date, newEnd?: Date, newScheduledDate?: Date): boolean => {
    if (scheduleType !== ScheduleType.TIME || !newStart) return false

    const newStartTime = newStart.getTime()
    const newEndTime = newEnd ? newEnd.getTime() : newStartTime + (60 * 60 * 1000)
    
    // Get the date we're checking for (default to today)
    const checkDate = newScheduledDate || new Date()
    const checkDateStr = checkDate.toISOString().split('T')[0]

    for (const todo of existingTodos) {
      if (todo.scheduleType !== ScheduleType.TIME || !todo.startTime) continue

      // Only check conflicts on the same day
      const todoDate = todo.scheduledDate || new Date().toISOString().split('T')[0]
      if (todoDate !== checkDateStr) continue

      const existingStart = new Date(todo.startTime).getTime()
      const existingEnd = todo.endTime 
        ? new Date(todo.endTime).getTime() 
        : existingStart + (60 * 60 * 1000)

      const hasOverlap = 
        (newStartTime >= existingStart && newStartTime < existingEnd) ||
        (newEndTime > existingStart && newEndTime <= existingEnd) ||
        (newStartTime <= existingStart && newEndTime >= existingEnd)

      if (hasOverlap) {
        return true
      }
    }

    return false
  }

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setPriority(Priority.NONE)
    setScheduleType(ScheduleType.NONE)
    setStartTime(null)
    setEndTime(null)
    setDueDate(null)
    setDueTime(null)
    setScheduledDate(null) // NEW
    setIsSubmitting(false)
    setTimeConflictError(null)
  }

const handleSubmit = async () => {
  if (!title.trim() || isSubmitting) return

  // Check for time conflicts
  if (scheduleType === ScheduleType.TIME && startTime) {
    const hasConflict = checkTimeConflict(startTime, endTime || undefined, scheduledDate || undefined)
    if (hasConflict) {
      setTimeConflictError('This time slot is already taken by another task')
      return
    }
  }

  setIsSubmitting(true)
  setTimeConflictError(null)

  try {
    let finalDueDate: string | undefined
    if (scheduleType === ScheduleType.DAY && dueDate) {
      if (dueTime) {
        const combined = new Date(dueDate)
        combined.setHours(dueTime.getHours())
        combined.setMinutes(dueTime.getMinutes())
        combined.setSeconds(0)
        combined.setMilliseconds(0)
        finalDueDate = combined.toISOString()
      } else {
        // Use local date components to avoid timezone issues
        const year = dueDate.getFullYear()
        const month = String(dueDate.getMonth() + 1).padStart(2, '0')
        const day = String(dueDate.getDate()).padStart(2, '0')
        finalDueDate = `${year}-${month}-${day}`
      }
    }

    // NEW: Combine scheduled date with times for TIME scheduling
    let finalStartTime: string | undefined
    let finalEndTime: string | undefined
    let finalScheduledDate: string | undefined

    if (scheduleType === ScheduleType.TIME) {
      // Use scheduledDate if provided, otherwise use today
      const dateToUse = scheduledDate || new Date()
      
      // FIX: Use local date components to avoid timezone conversion
      const year = dateToUse.getFullYear()
      const month = String(dateToUse.getMonth() + 1).padStart(2, '0')
      const day = String(dateToUse.getDate()).padStart(2, '0')
      finalScheduledDate = `${year}-${month}-${day}`

      console.log('dateToUse:', dateToUse)
      console.log('finalScheduledDate:', finalScheduledDate)

      if (startTime) {
        // Create a new date combining scheduledDate with startTime
        const combinedStart = new Date(dateToUse)
        combinedStart.setHours(startTime.getHours())
        combinedStart.setMinutes(startTime.getMinutes())
        combinedStart.setSeconds(0)
        combinedStart.setMilliseconds(0)
        finalStartTime = combinedStart.toISOString()
        console.log('startTime picker:', startTime)
        console.log('combinedStart:', combinedStart)
        console.log('finalStartTime:', finalStartTime)
      }

      if (endTime) {
        // Create a new date combining scheduledDate with endTime
        const combinedEnd = new Date(dateToUse)
        combinedEnd.setHours(endTime.getHours())
        combinedEnd.setMinutes(endTime.getMinutes())
        combinedEnd.setSeconds(0)
        combinedEnd.setMilliseconds(0)
        finalEndTime = combinedEnd.toISOString()
      }
    }

    console.log('Final submission data:', {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      scheduleType,
      startTime: finalStartTime,
      endTime: finalEndTime,
      scheduledDate: finalScheduledDate,
      dueDate: finalDueDate,
    })

    await onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      scheduleType,
      startTime: finalStartTime,
      endTime: finalEndTime,
      scheduledDate: finalScheduledDate,
      dueDate: finalDueDate,
    })

    resetForm()
  } catch (error) {
    console.error('Error adding task:', error)
    setIsSubmitting(false)
  }
}

  return {
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
    scheduleType,
    setScheduleType,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    dueDate,
    setDueDate,
    dueTime,
    setDueTime,
    scheduledDate, // NEW
    setScheduledDate, // NEW
    isSubmitting,
    timeConflictError,
    setTimeConflictError,
    resetForm,
    handleSubmit,
  }
}