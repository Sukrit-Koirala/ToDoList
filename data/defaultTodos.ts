import { Todo, Priority, ScheduleType } from '../types/todos'

export const DEFAULT_TODOS: Todo[] = [
  {
    id: 'morning-1',
    title: 'Wake Up',
    completed: false,
    groupId: 'morning',
    priority: Priority.NONE,
    scheduleType: ScheduleType.NONE,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'morning-2',
    title: 'Make Bed',
    completed: false,
    groupId: 'morning',
    priority: Priority.NONE,
    scheduleType: ScheduleType.NONE,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'morning-3',
    title: 'Drink Water',
    completed: false,
    groupId: 'morning',
    priority: Priority.NONE,
    scheduleType: ScheduleType.NONE,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'workout-1',
    title: 'Hit Chest',
    completed: false,
    groupId: 'workout',
    priority: Priority.NONE,
    scheduleType: ScheduleType.NONE,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'school-1',
    title: 'Finish Maths Hw',
    completed: false,
    groupId: 'school',
    priority: Priority.NONE,
    scheduleType: ScheduleType.NONE,
    createdAt: new Date().toISOString(),
  },
]
