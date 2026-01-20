import { Group } from "../../../components/ToDoComps/ToDoHeader/ToDoHeader.types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from "../../../constants/savingConstants";
import { useCallback, useEffect } from "react";

export const useDataPersistence = (groups: Group[], currentGroupId: string | null, isLoaded: boolean) => {
    const saveData = useCallback(async () => {
        if (!isLoaded) return;
        
        try {
        const dataToSave = { groups, currentGroupId };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
        console.log('✅ Data saved successfully');
        } catch (error) {
        console.error('❌ Error saving data:', error);
        }
    }, [groups, currentGroupId, isLoaded]);

    useEffect(() => {
        saveData();
    }, [saveData]);

  return { saveData };
}