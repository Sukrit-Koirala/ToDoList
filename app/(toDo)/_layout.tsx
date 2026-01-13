import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ToDoProvider } from '../../contexts/ToDoContext/ToDoProvider';


export default function RootLayout() {
  return (
    <ToDoProvider>
      <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#101010',
        tabBarInactiveTintColor: 'gray',
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
          title: 'Add Task',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'add-circle' : 'add-circle-outline'}
              size={size}
              color={color}
            />
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
