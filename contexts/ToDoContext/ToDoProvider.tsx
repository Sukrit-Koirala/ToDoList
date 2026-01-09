import React, { createContext, useContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Group, Todo } from '../../components/ToDoComps/ToDoHeader/ToDoHeader.types';
import { ToDoContextType } from './ToDoProvider.types';
import { DEFAULT_GROUPS } from '../../constants/Group';
import { STORAGE_KEY } from '../../constants/savingConstants';
import { useDataPersistence } from './hooks/useDataPersistence';
import { findGroupById } from './utils/ToDoHelpers';
import { useGroupOperations } from './hooks/useGroupOperations';
import { useCardOperations } from './hooks/useCardOperations';
import { useTodoOperations } from './hooks/useTodoOperations';

//Think of this as an empty box that stores all data
const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

export const ToDoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [currentGroupId, setCurrentGroupId] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const currentGroup = currentGroupId ? findGroupById(groups, currentGroupId) || null : null;
    //Runs once when the component mounts
    useEffect(() => {
        const initializeData = async () => {
        try {
            console.log("Loading data from async storage...");
            const storedData = await AsyncStorage.getItem(STORAGE_KEY);
            
            if (storedData) {
                const parsed = JSON.parse(storedData);
                console.log('📦 Loaded stored data:', parsed);

                const loadedGroups = parsed.groups || DEFAULT_GROUPS;
                setGroups(loadedGroups);
          
                const groupId = parsed.currentGroupId || loadedGroups[0]?.id || null;
                setCurrentGroupId(groupId);
            }else{
                console.log('📝 No stored data found, using DEFAULT_GROUPS');
                setGroups(DEFAULT_GROUPS);
                setCurrentGroupId(DEFAULT_GROUPS[0]?.id || null);
            }
        } catch (error) {
        console.error('❌ Error loading data:', error);
        // Fallback to defaults on error
        setGroups(DEFAULT_GROUPS);
        setCurrentGroupId(DEFAULT_GROUPS[0]?.id || null);
      } finally {
        setIsLoaded(true);
        console.log('✅ Data loading complete');
      }
    };
    initializeData();
    },[]);

    useDataPersistence(groups, currentGroupId, isLoaded);

    const groupOps = useGroupOperations(groups, setGroups, currentGroupId, setCurrentGroupId);
    const cardOps = useCardOperations(groups, setGroups);
    const todoOps = useTodoOperations(groups, setGroups);

    const value: ToDoContextType = {
    currentGroup,
    groups,
    isLoaded, // Add this to the context type if not already there
    ...groupOps,
    ...cardOps,
    ...todoOps,
    updateTodoReminder: function (groupId: string, cardId: string, todoId: string, reminder?: { time: string; }): void {
      throw new Error('Function not implemented.');
    }
  };

  if (!isLoaded) {
    return null; // Or return a loading spinner
  }

  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>;
};


export const useToDo = () => {
  const context = useContext(ToDoContext);
  if (!context) {
    throw new Error('useToDo must be used within a ToDoProvider');
  }
  return context;
};