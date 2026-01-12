
import { useState, useEffect, useCallback } from 'react';
import { GroupUI } from '../SelectGroupModal.types';

export const useGroupSelection = (
  groups: GroupUI[],
  currentGroupId: string | number
) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const findGroupIndex = useCallback(
    (groupId: string | number): number => {
      return groups.findIndex(g => g.id === groupId);
    },
    [groups]
  );

  useEffect(() => {
    const index = findGroupIndex(currentGroupId);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  }, [currentGroupId, findGroupIndex]);

  const getSelectedGroup = useCallback((): GroupUI | undefined => {
    return groups[selectedIndex];
  }, [groups, selectedIndex]);

  return {
    selectedIndex,
    setSelectedIndex,
    findGroupIndex,
    getSelectedGroup,
  };
};