
import { Group } from "../../components/ToDoComps/ToDoHeader/ToDoHeader.types";

export interface ToDoContextType {
  currentGroup: Group | null;
  groups: Group[];
  isLoaded: boolean;
  setCurrentGroup: (groupId: string) => void;
  createGroup: (name: string) => void;
  deleteGroup: (groupId: string) => void;
  updateGroupName: (groupId: string, newName: string) => void;
  
  // Card operations
  createCard: (groupId: string, title: string, color?: string) => void;
  deleteCard: (groupId: string, cardId: string) => void;
  updateCardTitle: (groupId: string, cardId: string, newTitle: string) => void;
  
  // Todo operations
  addTodo: (groupId: string, cardId: string, text: string, reminder?: { time: string }) => void;
  toggleTodo: (groupId: string, cardId: string, todoId: string) => void;
  deleteTodo: (groupId: string, cardId: string, todoId: string) => void;
  updateTodoText: (groupId: string, cardId: string, todoId: string, newText: string) => void;
  updateTodoReminder: (groupId: string, cardId: string, todoId: string, reminder?: { time: string }) => void;
}