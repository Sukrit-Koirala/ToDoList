// hooks/useTheme.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes, ThemeName, ThemeType } from '../data/themes';

const STORAGE_KEY = 'USER_THEME';

const fetchTheme = async (): Promise<ThemeType> => {
  const storedTheme = await AsyncStorage.getItem(STORAGE_KEY);
  if (storedTheme && themes[storedTheme as ThemeName]) {
    return themes[storedTheme as ThemeName];
  }
  return themes.mono; // default
};

export const useTheme = () => {
  const queryClient = useQueryClient();
    const { data: theme = themes.mono, isLoading } = useQuery({
    queryKey: ['theme'],
    queryFn: fetchTheme,
    staleTime: Infinity,
    });

  // Switch theme and save to AsyncStorage
  const switchTheme = async (themeName: ThemeName) => {
    if (!themes[themeName]) return;
    await AsyncStorage.setItem(STORAGE_KEY, themeName);

    // Update React Query cache
    queryClient.setQueryData(['theme'], themes[themeName]);
  };

  return { theme, switchTheme, isLoading };
};
