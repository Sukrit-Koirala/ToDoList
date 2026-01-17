import AsyncStorage from '@react-native-async-storage/async-storage'
import { DEFAULT_TODOS } from '../data/defaultTodos'
import { TodoType, TodoGroup, Todo } from '../types/todos'

// Remove the enum and interface definitions (now imported)
// Export them so existing imports still work
export { TodoType, TodoGroup, Todo } from '../types/todos'
export type { Group } from '../types/todos'

const TODO_KEY = 'TODOS_V2'

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
    await AsyncStorage.setItem(
      TODO_KEY,
      JSON.stringify(DEFAULT_TODOS)
    )
    return DEFAULT_TODOS
  }

  return JSON.parse(raw)
}

export const addTodo = async (params: {
  title: string
  typeId?: TodoType
  groupId?: TodoGroup
}): Promise<Todo> => {
  const todos = await readTodos()

  const newTodo: Todo = {
    id: Date.now().toString(),
    title: params.title,
    completed: false,
    typeId: params.typeId ?? TodoType.TASK,
    groupId: params.groupId ?? TodoGroup.PERSONAL,
  }

  await writeTodos([newTodo, ...todos])
  return newTodo
}

export const toggleTodo = async (id: string) => {
  const todos = await readTodos()

  const updated = todos.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  )

  await writeTodos(updated)
}

export const updateTodo = async (
  id: string,
  updates: Partial<Omit<Todo, 'id'>>
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
