import AsyncStorage from '@react-native-async-storage/async-storage'
import { Group } from '../types/todos'

export type { Group } from '../types/todos'

const GROUPS_KEY = 'GROUPS_V4'

const DEFAULT_GROUPS: Group[] = [
  {
    id: 'morning',
    name: 'Morning',
    type: 'normal',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'workout',
    name: 'Workout',
    type: 'normal',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'school',
    name: 'School',
    type: 'normal',
    createdAt: new Date().toISOString(),
  },
]

/* ---------- Helpers ---------- */

const readGroups = async (): Promise<Group[]> => {
  const raw = await AsyncStorage.getItem(GROUPS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Group[]
  } catch {
    return []
  }
}

const writeGroups = async (groups: Group[]) => {
  await AsyncStorage.setItem(GROUPS_KEY, JSON.stringify(groups))
}

/* ---------- API ---------- */

export const getGroups = async (): Promise<Group[]> => {
  const groups = await readGroups()

  if (groups.length === 0) {
    await writeGroups(DEFAULT_GROUPS)
    return DEFAULT_GROUPS
  }

  return groups
}

export const addGroup = async (params: {
  name: string
  description?: string
  type?: Group['type']
}) => {
  const groups = await getGroups()

  const newGroup: Group = {
    id: Date.now().toString(),
    name: params.name,
    description: params.description,
    type: params.type ?? 'normal',
    createdAt: new Date().toISOString(),
  }

  // Prevent duplicate names (soft rule)
  if (groups.some(g => g.name.toLowerCase() === params.name.toLowerCase())) {
    return
  }

  await writeGroups([newGroup, ...groups])
}
