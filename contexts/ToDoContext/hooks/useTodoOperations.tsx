import { useCallback } from "react";
import { Group } from "../../../components/ToDoComps/ToDoHeader/ToDoHeader.types";
import { createNewTodo, updateCardInGroup, updateGroupInList, updateTodoInCard } from "../utils/ToDoHelpers";

export const useTodoOperations = (
  groups: Group[],
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>
) => {
  const addTodo = useCallback((groupId: string, cardId: string, text: string) => {
    const newTodo = createNewTodo(text);
    
    setGroups(prev => updateGroupInList(prev, groupId, g =>
      updateCardInGroup(g, cardId, c => ({
        ...c,
        todos: [...c.todos, newTodo],
      }))
    ));
  }, [setGroups]);

  const toggleTodo = useCallback((groupId: string, cardId: string, todoId: string) => {
    setGroups(prev => updateGroupInList(prev, groupId, g =>
      updateCardInGroup(g, cardId, c =>
        updateTodoInCard(c, todoId, t => ({ ...t, completed: !t.completed }))
      )
    ));
  }, [setGroups]);

  const deleteTodo = useCallback((groupId: string, cardId: string, todoId: string) => {
    setGroups(prev => updateGroupInList(prev, groupId, g =>
      updateCardInGroup(g, cardId, c => ({
        ...c,
        todos: c.todos.filter(t => t.id !== todoId),
      }))
    ));
  }, [setGroups]);

  const updateTodoText = useCallback((groupId: string, cardId: string, todoId: string, newText: string) => {
    setGroups(prev => updateGroupInList(prev, groupId, g =>
      updateCardInGroup(g, cardId, c =>
        updateTodoInCard(c, todoId, t => ({ ...t, text: newText }))
      )
    ));
  }, [setGroups]);

  return { addTodo, toggleTodo, deleteTodo, updateTodoText };
};