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

export const addTodo = async (params: {
  title: string
  groupId: string
  description?: string
  priority?: Priority

  scheduleType?: ScheduleType | undefined
  startTime?: string
  endTime?: string
  dueDate?: string
}): Promise<Todo> => {
  const todos = await readTodos()

  const scheduleType = params.scheduleType ?? ScheduleType.NONE

  const newTodo: Todo = {
    id: Date.now().toString(),
    title: params.title,
    description: params.description,
    completed: false,

    groupId: params.groupId,

    priority: params.priority ?? Priority.NONE,

    scheduleType,

    // DAY scheduling
    dueDate:
      scheduleType === ScheduleType.DAY
        ? params.dueDate
        : undefined,

    // TIME scheduling
    startTime:
      scheduleType === ScheduleType.TIME
        ? params.startTime
        : undefined,

    endTime:
      scheduleType === ScheduleType.TIME
        ? params.endTime
        : undefined,

    createdAt: new Date().toISOString(),
  }

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
        }
      : todo
  )

  await writeTodos(updated)
}

export const scheduleTodoWithTime = async (
  id: string,
  startTime?: string,
  endTime?: string
) => {
  const todos = await readTodos()

  const updated = todos.map(todo =>
    todo.id === id
      ? {
          ...todo,
          scheduleType: ScheduleType.TIME,
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
