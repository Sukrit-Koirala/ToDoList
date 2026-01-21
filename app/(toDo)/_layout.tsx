import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AddTabButton from '../../components/CustomUI/AddTabButton/AddTabButton';
import { useTheme } from '../../hooks/useTheme';
import { ModalProvider } from '../../components/CustomUI/Modal/ModalProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function RootLayout() {
  const { theme, isLoading } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
          {/* ModalProvider wraps EVERYTHING including Tabs */}
          <ModalProvider>
            <Tabs
              screenOptions={{
                tabBarActiveTintColor: theme.headerBackground,
                tabBarInactiveTintColor: theme.headerSubText || 'gray',
                tabBarStyle: {
                  height: 78,
                  overflow: 'visible',
                },
                tabBarItemStyle: {
                  overflow: 'visible',
                },
              }}
            >
              <Tabs.Screen
                name="toDo"
                options={{
                  title: 'Tasks',
                  headerShown: false,
                  tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons
                      name={focused ? 'checkbox' : 'checkbox-outline'}
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />

              <Tabs.Screen
                name="calander"
                options={{
                  title: 'Calendar',
                  headerShown: false,
                  tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons
                      name={focused ? 'calendar' : 'calendar-outline'}
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />

              <Tabs.Screen
                name="add"
                options={{
                  headerShown: false,
                  tabBarLabel: () => null,
                  tabBarButton: (props) => (
                    <AddTabButton {...props} />
                  ),
                }}
              />

              <Tabs.Screen
                name="bookmarks"
                options={{
                  title: 'Bookmarks',
                  headerShown: false,
                  tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons
                      name={focused ? 'bookmark' : 'bookmark-outline'}
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />

              <Tabs.Screen
                name="profile"
                options={{
                  title: 'Profile',
                  headerShown: false,
                  tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons
                      name={focused ? 'person' : 'person-outline'}
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
            </Tabs>
          </ModalProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}