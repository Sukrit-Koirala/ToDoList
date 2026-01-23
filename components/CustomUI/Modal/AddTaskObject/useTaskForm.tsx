import { useState } from 'react'
import { Priority, ScheduleType } from '../../../../types/todos'

interface ExistingTodo {
  scheduleType: ScheduleType
  startTime?: string
  endTime?: string
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
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeConflictError, setTimeConflictError] = useState<string | null>(null)

  const checkTimeConflict = (newStart: Date, newEnd?: Date): boolean => {
    if (scheduleType !== ScheduleType.TIME || !newStart) return false

    const newStartTime = newStart.getTime()
    const newEndTime = newEnd ? newEnd.getTime() : newStartTime + (60 * 60 * 1000)

    for (const todo of existingTodos) {
      if (todo.scheduleType !== ScheduleType.TIME || !todo.startTime) continue

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
    setIsSubmitting(false)
    setTimeConflictError(null)
  }

  const handleSubmit = async () => {
    if (!title.trim() || isSubmitting) return

    // Check for time conflicts
    if (scheduleType === ScheduleType.TIME && startTime) {
      const hasConflict = checkTimeConflict(startTime, endTime || undefined)
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
          finalDueDate = dueDate.toISOString().split('T')[0]
        }
      }

      await onAdd({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        scheduleType,
        startTime: scheduleType === ScheduleType.TIME && startTime 
          ? startTime.toISOString() 
          : undefined,
        endTime: scheduleType === ScheduleType.TIME && endTime 
          ? endTime.toISOString() 
          : undefined,
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
    isSubmitting,
    timeConflictError,
    setTimeConflictError,
    resetForm,
    handleSubmit,
  }
}