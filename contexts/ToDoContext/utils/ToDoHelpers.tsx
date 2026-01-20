import { Group,Card,Todo } from "../../../components/ToDoComps/ToDoHeader/ToDoHeader.types";

export const findGroupById = (groups: Group[], groupId: string): Group | undefined => {
  return groups.find(g => g.id === groupId);
};

export const updateGroupInList = (groups: Group[], groupId: string, updater: (group: Group) => Group): Group[] => {
  return groups.map(g => g.id === groupId ? updater(g) : g);
};

export const updateCardInGroup = (group: Group, cardId: string, updater: (card: Card) => Card): Group => {
  return {
    ...group,
    cards: group.cards.map(c => c.id === cardId ? updater(c) : c),
  };
};

export const updateTodoInCard = (card: Card, todoId: string, updater: (todo: Todo) => Todo): Card => {
  return {
    ...card,
    todos: card.todos.map(t => t.id === todoId ? updater(t) : t),
  };
};

export const generateId = (prefix: string): string => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const createNewGroup = (name: string): Group => ({
  id: generateId('group'),
  name,
  isDefault: false,
  createdAt: new Date().toISOString(),
  cards: [],
});

export const createNewCard = (title: string, color: string = '#eae7ffff'): Card => ({
  id: generateId('card'),
  title,
  color,
  createdAt: new Date().toISOString(),
  todos: [],
});

export const createNewTodo = (text: string): Todo => ({
  id: generateId('todo'),
  text,
  completed: false,
  createdAt: new Date().toISOString(),
});