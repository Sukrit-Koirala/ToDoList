import { Group } from '../components/ToDoComps/ToDoHeader/ToDoHeader.types'

export const DEFAULT_GROUPS: Group[] = [
  {
    id: 'daily-tasks',
    name: 'Daily Tasks',
    isDefault: true,
    createdAt: new Date().toISOString(),
    cards: [
      {
        id: 'daily-card-1',
        title: 'Morning Routine',
        color: '#eae7ffff',
        createdAt: new Date().toISOString(),
        todos: [
          { id: '1', text: 'Drink water', completed: false, createdAt: new Date().toISOString() },
          { id: '2', text: 'Exercise 30 min', completed: false, createdAt: new Date().toISOString() },
        ],
      },
    ],
  },
  {
    id: 'birthdays',
    name: 'Birthdays',
    isDefault: true,
    createdAt: new Date().toISOString(),
    cards: [
      {
        id: 'birthday-card-1',
        title: 'Upcoming',
        color: '#ffe7f0',
        createdAt: new Date().toISOString(),
        todos: [],
      },
    ],
  },
  {
    id: 'workout',
    name: 'Workout',
    isDefault: true,
    createdAt: new Date().toISOString(),
    cards: [
      {
        id: 'workout-card-1',
        title: 'Week-1',
        color: '#e7f5ff',
        createdAt: new Date().toISOString(),
        todos: [
          { id: '1', text: 'Chest & Triceps', completed: false, createdAt: new Date().toISOString() },
          { id: '2', text: 'Back & Biceps', completed: false, createdAt: new Date().toISOString() },
          { id: '3', text: 'Legs & Shoulders', completed: false, createdAt: new Date().toISOString() },
        ],
      },
      {
        id: 'workout-card-2',
        title: 'Week-2',
        color: '#b2dfffff',
        createdAt: new Date().toISOString(),
        todos: [
          { id: '1', text: 'Chest & Triceps', completed: false, createdAt: new Date().toISOString() },
          { id: '2', text: 'Back & Biceps', completed: false, createdAt: new Date().toISOString() },
          { id: '3', text: 'Legs & Shoulders', completed: false, createdAt: new Date().toISOString() },
        ],
      },
    ],
  },
];
