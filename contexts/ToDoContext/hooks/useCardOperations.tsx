import { useCallback } from "react";
import { Group } from "../../../components/ToDoComps/ToDoHeader/ToDoHeader.types";
import { createNewCard, updateCardInGroup, updateGroupInList } from "../utils/ToDoHelpers";

export const useCardOperations = (
  groups: Group[],
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>
) => {
  const createCard = useCallback((groupId: string, title: string, color?: string) => {
    const newCard = createNewCard(title, color);
    
    setGroups(prev => updateGroupInList(prev, groupId, g => ({
      ...g,
      cards: [...g.cards, newCard],
    })));
  }, [setGroups]);

  const deleteCard = useCallback((groupId: string, cardId: string) => {
    setGroups(prev => updateGroupInList(prev, groupId, g => ({
      ...g,
      cards: g.cards.filter(c => c.id !== cardId),
    })));
  }, [setGroups]);

  const updateCardTitle = useCallback((groupId: string, cardId: string, newTitle: string) => {
    setGroups(prev => updateGroupInList(prev, groupId, g => 
      updateCardInGroup(g, cardId, c => ({ ...c, title: newTitle }))
    ));
  }, [setGroups]);

  return { createCard, deleteCard, updateCardTitle };
};