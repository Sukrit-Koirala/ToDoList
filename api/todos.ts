import AsyncStorage from '@react-native-async-storage/async-storage'
import { DEFAULT_TODOS } from '../data/defaultTodos'
import {
  Todo,
  Priority,
  ScheduleType,
} from '../types/todos'

export type { Todo } from '../types/todos'
export type {Group} from "../types/todos"

const TODO_KEY = 'TODOS_V4'

/* ---------- Internal Helpers ---------- */

const readTodos = async (): Promise<Todo[]> => {
  const raw = await AsyncStorage.getItem(TODO_KEY)
  if (!raw) return []

  try {
    return JSON.parse(raw) as Todo[]
  } catch {
    return []
  }
}

const writeTodos = async (todos: Todo[]) => {
  await AsyncStorage.setItem(TODO_KEY, JSON.stringify(todos))
}

const getTodayDate = (): string => {
  const today = new Date()
  // FIX: Use local date components to avoid timezone issues
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/* ---------- API Functions ---------- */

export const getTodos = async (): Promise<Todo[]> => {
  const raw = await AsyncStorage.getItem(TODO_KEY)

  // FIRST LAUNCH → seed defaults
  if (!raw) {
    await writeTodos(DEFAULT_TODOS)
    return DEFAULT_TODOS
  }

  return JSON.parse(raw)
}

export const getTodosByDate = async (date: string): Promise<Todo[]> => {
  const todos = await readTodos()
  
  return todos.filter(todo => {
    // Filter for DAY schedule type with matching date
    if (todo.scheduleType === ScheduleType.DAY && todo.dueDate === date) {
      return true
    }
    
    // Filter for TIME schedule type - check if it has a date associated
    if (todo.scheduleType === ScheduleType.TIME && todo.scheduledDate === date) {
      return true
    }
    
    return false
  })
}

export const addTodo = async (params: {
  title: string
  groupId: string
  description?: string
  priority?: Priority

  scheduleType?: ScheduleType | undefined
  startTime?: string
  endTime?: string
  dueDate?: string
  scheduledDate?: string
}): Promise<Todo> => {
  const todos = await readTodos()

  console.log('[addTodo] Received params:', params)
  console.log('[addTodo] params.scheduledDate:', params.scheduledDate)

  const scheduleType = params.scheduleType ?? ScheduleType.NONE

  const newTodo: Todo = {
    id: Date.now().toString(),
    title: params.title,
    description: params.description,
    completed: false,

    groupId: params.groupId,

    priority: params.priority ?? Priority.NONE,

    scheduleType,

    dueDate:
      scheduleType === ScheduleType.DAY
        ? params.dueDate
        : undefined,

    startTime:
      scheduleType === ScheduleType.TIME
        ? params.startTime
        : undefined,

    endTime:
      scheduleType === ScheduleType.TIME
        ? params.endTime
        : undefined,

    scheduledDate:
      scheduleType === ScheduleType.TIME
        ? params.scheduledDate ?? getTodayDate()
        : undefined,

    createdAt: new Date().toISOString(),
  }

  console.log('[addTodo] Created newTodo.scheduledDate:', newTodo.scheduledDate)

  await writeTodos([newTodo, ...todos])
  return newTodo
}

/* ---------- Scheduling ---------- */

export const scheduleTodoForDay = async (
  id: string,
  dueDate: string // ISO date (YYYY-MM-DD)
) => {
  const todos = await readTodos()

  const updated = todos.map(todo =>
    todo.id === id
      ? {
          ...todo,
          scheduleType: ScheduleType.DAY,
          dueDate,
          startTime: undefined,
          endTime: undefined,
          scheduledDate: undefined,
        }
      : todo
  )

  await writeTodos(updated)
}

export const scheduleTodoWithTime = async (
  id: string,
  startTime?: string,
  endTime?: string,
  scheduledDate?: string // Optional: defaults to today
) => {
  const todos = await readTodos()

  // If startTime or endTime provided but no date, default to today
  const finalScheduledDate = (startTime || endTime) 
    ? scheduledDate ?? getTodayDate()
    : undefined

  const updated = todos.map(todo =>
    todo.id === id
      ? {
          ...todo,
          scheduleType: ScheduleType.TIME,
          scheduledDate: finalScheduledDate,
          startTime,
          endTime,
          dueDate: undefined,
        }
      : todo
  )

  await writeTodos(updated)
}

export const unscheduleTodo = async (id: string) => {
  const todos = await readTodos()

  const updated = todos.map(todo =>
    todo.id === id
      ? {
          ...todo,
          scheduleType: ScheduleType.NONE,
          startTime: undefined,
          endTime: undefined,
          dueDate: undefined,
          scheduledDate: undefined,
        }
      : todo
  )

  await writeTodos(updated)
}

/* ---------- Completion ---------- */

export const toggleTodo = async (id: string) => {
  const todos = await readTodos()

  const updated = todos.map(todo =>
    todo.id === id
      ? {
          ...todo,
          completed: !todo.completed,
          completedAt: !todo.completed
            ? new Date().toISOString()
            : undefined,
        }
      : todo
  )

  await writeTodos(updated)
}

/* ---------- Update / Delete ---------- */

export const updateTodo = async (
  id: string,
  updates: Partial<Omit<Todo, 'id' | 'createdAt'>>
) => {
  const todos = await readTodos()

  const updated = todos.map(todo =>
    todo.id === id ? { ...todo, ...updates } : todo
  )

  await writeTodos(updated)
}

export const deleteTodo = async (id: string) => {
  const todos = await readTodos()
  await writeTodos(todos.filter(todo => todo.id !== id))
}

export const clearTodos = async () => {
  await AsyncStorage.removeItem(TODO_KEY)
}