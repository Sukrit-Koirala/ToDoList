import { Todo, TodoType, TodoGroup } from '../types/todos'

export const DEFAULT_TODOS: Todo[] = [
  {
    id: 'morning-1',
    title: 'Wake Up',
    completed: false,
    typeId: TodoType.TASK,
    groupId: TodoGroup.MORNING,
  },
  {
    id: 'morning-2',
    title: 'Make Bed',
    completed: false,
    typeId: TodoType.TASK,
    groupId: TodoGroup.MORNING,
  },
  {
    id: 'morning-3',
    title: 'Drink Water',
    completed: false,
    typeId: TodoType.TASK,
    groupId: TodoGroup.MORNING,
  },
  {
    id: 'workout-1',
    title: 'Hit Chest',
    completed: false,
    typeId: TodoType.TASK,
    groupId: TodoGroup.WORKOUT,
  },
  {
    id: 'school-1',
    title: 'Finish Maths Hw',
    completed: false,
    typeId: TodoType.TASK,
    groupId: TodoGroup.SCHOOL,
  },


]
