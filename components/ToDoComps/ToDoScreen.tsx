import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import RoundedRectangle from '../CustomUI/RoundedRectangle/RoundedRectangle';
import Line from '../CustomUI/Line/Line';
import TaskCard from '../CustomUI/TaskCards/TaskCard';

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getGroups } from '../../api/groups';
import CardContainer from '../CustomUI/CardsDisplay/CardsDisplay';
import { getTodos } from '../../api/todos';
import { useTheme } from '../../hooks/useTheme';

import { Pressable } from 'react-native'
import { useModal } from '../CustomUI/Modal/ModalContext'
import AsyncStorage from '@react-native-async-storage/async-storage';


const ToDoScreen = () => {
  const queryClient = useQueryClient()
  const { openModal } = useModal()


  const { data: todos = [], isLoading: isTodosLoading,dataUpdatedAt } = useQuery({
  queryKey: ['todos'],
  queryFn: getTodos,
  })


  const { data: groups = [], isLoading } = useQuery({
  queryKey: ['groups'],
  queryFn: getGroups,
  })

  //   useEffect(() => {
  //   const clearStorage = async () => {
  //     try {
  //       await AsyncStorage.clear();  // ✅ Clears ALL data
  //       console.log('AsyncStorage cleared');
  //     } catch (error) {
  //       console.error('Error clearing AsyncStorage:', error);
  //     }
  //   };

  //   clearStorage();
  // }, []); // Empty dependency array = runs once on mount

  const groupsWithStats = groups.map(group => {
  const groupTodos = todos.filter(todo => todo.groupId === group.id)
  const completedCount = groupTodos.filter(t => t.completed).length
  const total = groupTodos.length
    return {
      ...group,
      completed: completedCount,
      total,
    }
  })

  const { theme, switchTheme} = useTheme();

  useEffect(() => {
    switchTheme('purple');
  }, []); 

  return (
    <LinearGradient
      colors={[theme.background, 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.56 }}
      style={styles.container}
    >
      {/* HEADER */}
      <View style={styles.headerWrapper}>
        <RoundedRectangle
          backgroundColor={theme.headerBackground}
          radius={20}
          style={{ ...StyleSheet.absoluteFillObject, opacity: 0.25 }}
        />
        <View style={styles.headerContent}>
          <Text style={[styles.headerText,{color:theme.headerText}]}>Good Morning, Suku</Text>
          <Text style={[styles.subText,{color:theme.headerSubText}]}>Sunday, January 10</Text>
        </View>
      </View>

      {/* BOARDS */}
      <Text style={[styles.boardsText,{color:theme.titleText}]}>Boards</Text>
      <Pressable onPress={() => openModal('OPEN_BOARDS',groupsWithStats)}>
        <Text style={[styles.viewAllText, { color: theme.subtitleText }]}>
          View All
        </Text>
      </Pressable>
      <View style={styles.cardsWrapper}>
        <CardContainer 
        groups={groupsWithStats} />
      </View>

      <Line 
        width={'96%'} 
        style={{ alignSelf: 'center', marginTop:8 }} 
        thickness={1} 
      />

      {/* DAILY TASKS SECTION WRAPPER */}
      <View style={styles.dailyTasksSection}>
        <Text style={[styles.DailyTasks,{color:theme.outGradientTitle}]}>Daily Tasks</Text>
        <Text style={[styles.viewAllTasksText,{color:theme.outGradientSubTitle}]}>View All</Text>

        {/* VERTICAL SCROLL for TaskCards */}
        <View style={styles.tasksWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.tasksScrollContainer}
            // style={{ backgroundColor: '#ffcc00' }}
          >
            <TaskCard text='Drink Water' radius={4}/>
            <TaskCard text='Take a Break' radius={4}/>
            <TaskCard text='Read a Book' radius={4}/>
            <TaskCard text='Meditate' radius={4}/>
            <TaskCard text='Exercise' radius={4}/>
            <TaskCard text='Write Journal' radius={4}/>

          </ScrollView>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ToDoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* HEADER */
  headerWrapper: {
    width: '80%',
    height: 87,
    marginTop: 80,
    top: 10,
    alignSelf: 'center',
    marginLeft: -32,
  },

  headerContent: {
    paddingLeft: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'PlayFair',
  },
  subText: {
    fontSize: 14,
    fontFamily: 'PlayFair',
  },

  /* BOARDS TITLE */
  boardsText: {
    marginTop: 48,
    marginLeft: 32,
    fontSize: 32,
    fontFamily: 'PlayFair',
  },

  viewAllText: {
    marginRight: 8,
    fontSize: 16,
    fontFamily: 'PlayFair',
    fontWeight: 'normal',
    alignSelf: 'flex-end',
    marginTop: -24,
  },
  cardsWrapper: {
    marginTop: 8,
    flex: 0.4,
    backgroundColor: 'transparent',
    paddingRight: 0,
    paddingLeft: 0,
    marginBottom: 32,
  },

  /* DAILY TASKS */
  dailyTasksSection: {
    marginTop: 16,
    flex: 0.8, // allow vertical scroll to expand within this space
  },
  DailyTasks: {
    marginLeft: 32,
    fontSize: 24,
    fontFamily: 'PlayFair',
  },
  viewAllTasksText: {
    marginRight: 8,
    fontSize: 16,
    fontFamily: 'PlayFair',
    fontWeight: 'normal',
    alignSelf: 'flex-end',
    marginTop: -24,
  },

  /* VERTICAL SCROLL WRAPPER */
  tasksWrapper: {
    marginTop: 8,
    flex: 0.95, // take available vertical space
  },
  tasksScrollContainer: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  
});
