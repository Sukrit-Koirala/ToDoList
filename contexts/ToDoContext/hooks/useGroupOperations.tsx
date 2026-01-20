import { useCallback } from "react";
import { Group } from "../../../components/ToDoComps/ToDoHeader/ToDoHeader.types";
import { createNewGroup, findGroupById, updateGroupInList } from "../utils/ToDoHelpers";

export const useGroupOperations = (
  groups: Group[],
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>,
  currentGroupId: string | null,
  setCurrentGroupId: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const setCurrentGroup = useCallback((groupId: string) => {
    const group = findGroupById(groups, groupId);
    if (group) {
      setCurrentGroupId(groupId);
    }
  }, [groups, setCurrentGroupId]);

  const createGroup = useCallback((name: string) => {
    const newGroup = createNewGroup(name);
    setGroups(prev => [...prev, newGroup]);
  }, [setGroups]);

  const deleteGroup = useCallback((groupId: string) => {
    const group = findGroupById(groups, groupId);
    
    if (group?.isDefault) {
      console.warn('Cannot delete default groups');
      return;
    }
    
    const updatedGroups = groups.filter(g => g.id !== groupId);
    setGroups(updatedGroups);
    
    if (currentGroupId === groupId) {
      setCurrentGroupId(updatedGroups[0]?.id || null);
    }
  }, [groups, currentGroupId, setGroups, setCurrentGroupId]);

  const updateGroupName = useCallback((groupId: string, newName: string) => {
    setGroups(prev => updateGroupInList(prev, groupId, g => ({ ...g, name: newName })));
  }, [setGroups]);

  return { setCurrentGroup, createGroup, deleteGroup, updateGroupName };
};