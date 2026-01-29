import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import RoundedRectangle from '../CustomUI/RoundedRectangle/RoundedRectangle';
import Line from '../CustomUI/Line/Line';
import HabitTaskCard from '../CustomUI/HabitCard/HabitTaskCard';

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getGroups } from '../../api/groups';
import CardContainer from '../CustomUI/CardsDisplay/CardsDisplay';
import { getTodos } from '../../api/todos';
import { getHabits, toggleHabitCompletion } from '../../api/habits';
import { useTheme } from '../../hooks/useTheme';

import { Pressable } from 'react-native'
import { useModal } from '../CustomUI/Modal/ModalContext'

const ToDoScreen = () => {
  const queryClient = useQueryClient()
  const { openModal } = useModal()
  const { theme, switchTheme } = useTheme(); // MOVED UP

  const { data: todos = [], isLoading: isTodosLoading, dataUpdatedAt } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  const { data: groups = [], isLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups,
  })

  // CHANGED: Pass theme to getHabits
  const { data: habits = [], isLoading: isHabitsLoading } = useQuery({
    queryKey: ['habits', theme], // Add theme to queryKey so it refetches when theme changes
    queryFn: () => getHabits(theme),
  })

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

  useEffect(() => {
    switchTheme('green');
  }, []);

  const handleToggleHabit = async (habitId: string) => {
    // Get today's date
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const todayDate = `${year}-${month}-${day}`

    await toggleHabitCompletion(habitId, todayDate)
    queryClient.invalidateQueries({ queryKey: ['habits'] })
  }

  return (
    <LinearGradient
      colors={[theme.background, 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.56 }}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.headerWrapper}>
          <RoundedRectangle
            backgroundColor={theme.headerBackground}
            radius={20}
            style={{ ...StyleSheet.absoluteFillObject, opacity: 0.25 }}
          />
          <View style={styles.headerContent}>
            <Text style={[styles.headerText, { color: theme.headerText }]}>Good Morning, Suku</Text>
            <Text style={[styles.subText, { color: theme.headerSubText }]}>Sunday, January 10</Text>
          </View>
        </View>

        {/* BOARDS */}
        <Text style={[styles.boardsText, { color: theme.titleText }]}>Boards</Text>
        <Pressable onPress={() => openModal('OPEN_BOARDS', groupsWithStats)}>
          <Text style={[styles.viewAllText, { color: theme.subtitleText }]}>
            View All
          </Text>
        </Pressable>
        <View style={styles.cardsWrapper}>
          <CardContainer groups={groupsWithStats} />
        </View>

        <Line
          width={'96%'}
          style={{ alignSelf: 'center', marginTop: 8 }}
          thickness={1}
        />

        {/* DAILY HABITS SECTION */}
        <View style={styles.habitsSection}>
          <Text style={[styles.sectionTitle, { color: theme.outGradientTitle }]}>Daily Habits</Text>
          <Text style={[styles.viewAllTasksText, { color: theme.outGradientSubTitle }]}>View All</Text>

          <View style={styles.habitsWrapper}>
            {habits.filter(h => !h.archived).map(habit => (
              <HabitTaskCard
                key={habit.id}
                habit={habit}
                onToggle={handleToggleHabit}
                radius={4}
              />
            ))}
          </View>
        </View>
      </ScrollView>
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
    height: 200,
    backgroundColor: 'transparent',
  },

  /* HABITS SECTION */
  habitsSection: {
    marginTop: 8,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },

  sectionTitle: {
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

  habitsWrapper: {
    marginTop: 8,
  },
});