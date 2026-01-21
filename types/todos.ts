// types/todos.ts (reference shape)
export enum Priority {
  NONE = 'none',
  LOW = 'low',
  HIGH = 'high',
  MEDIUM = 'medium'

}

export enum ScheduleType {
  NONE = 'none',
  DAY = 'day',
  TIME = 'time',
}

export type ChecklistItem = {
  id: string
  text: string
  completed: boolean
}

export type Todo = {
  id: string
  title: string
  description?: string

  completed: boolean

  groupId: string

  priority: Priority

  scheduleType: ScheduleType
  dueDate?: string        // ISO date (day-based)
  startTime?: string     // ISO datetime
  endTime?: string       // ISO datetime

  checklist?: ChecklistItem[]

  createdAt: string
  completedAt?: string
}


export type Group = {
  id: string
  name: string
  description?: string
  type: 'normal' | 'daily'
  createdAt: string
}

