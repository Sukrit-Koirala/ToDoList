import AsyncStorage from '@react-native-async-storage/async-storage'
import { Group } from '../types/todos'

export type { Group } from '../types/todos'

const GROUPS_KEY = 'GROUPS_V3'

const DEFAULT_GROUPS: Group[] = [
  { id: 'MORNING', name: 'Morning', color: '#101010' },
  { id: 'WORKOUT', name:'Workout',color: '#200069'},
  { id: 'SCHOOL', name: 'School', color: '#00053e' },
]

export const getGroups = async (): Promise<Group[]> => {
  const raw = await AsyncStorage.getItem(GROUPS_KEY)

  if (!raw) {
    await AsyncStorage.setItem(
      GROUPS_KEY,
      JSON.stringify(DEFAULT_GROUPS)
    )
    return DEFAULT_GROUPS
  }

  return JSON.parse(raw)
}



export const addGroup = async (group: Group) => {
  const groups = await getGroups()
  await AsyncStorage.setItem(
    GROUPS_KEY,
    JSON.stringify([...groups, group])
  )
}
