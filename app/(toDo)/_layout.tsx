import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ToDoProvider } from '../../contexts/ToDoContext/ToDoProvider';
import AddTabButton from '../../components/CustomUI/AddTabButton/AddTabButton';


export default function RootLayout() {
  return (
    <ToDoProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#101010',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 78,
          overflow: 'visible', // 👈 REQUIRED
        },
        tabBarItemStyle: {
          overflow: 'visible', // 👈 REQUIRED
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
    </ToDoProvider>
  );
}
