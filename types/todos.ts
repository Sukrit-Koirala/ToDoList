export enum TodoType {
  TASK = 'TASK',
  EVENT = 'EVENT',
  REMINDER = 'REMINDER',
  DAILY = 'DAILY'
}

export enum TodoGroup {
  PERSONAL = 'PERSONAL',
  SCHOOL = 'SCHOOL',
  WORK = 'WORK',
  WORKOUT = 'WORKOUT',
  MORNING = 'MORNING',
}

export interface Group {
  id: TodoGroup | string
  name: string
}

export interface Todo {
  id: string
  title: string
  completed: boolean
  typeId: TodoType
  groupId: TodoGroup
}