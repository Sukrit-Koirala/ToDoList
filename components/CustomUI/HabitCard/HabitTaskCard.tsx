import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import RoundedRectangle from '../RoundedRectangle/RoundedRectangle';
import { Ionicons } from '@expo/vector-icons';
import { Habit } from '../../../types/habits';

export interface HabitTaskCardProps {
  habit: Habit;
  onToggle: (habitId: string) => void;
  radius?: number;
}

const HabitTaskCard = ({ habit, onToggle, radius = 12 }: HabitTaskCardProps) => {
  // Get today's date
  const getTodayDate = (): string => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Check if completed today
  const isCompletedToday = () => {
    const today = getTodayDate()
    const completion = habit.completions.find(c => c.date === today)
    return completion?.completed || false
  }

  const completed = isCompletedToday()

  return (
    <Pressable onPress={() => onToggle(habit.id)} style={styles.wrapper}>
      <RoundedRectangle
        backgroundColor="#F6F6F6"
        radius={radius}
        style={styles.card}
      >
        <View style={styles.content}>
          <Ionicons
            name={completed ? 'checkmark-circle' : 'checkmark-circle-outline'}
            size={22}
            color={completed ? habit.color : '#555'}
          />
          <Text style={[styles.text, completed && styles.completedText]}>
            {habit.title}
          </Text>
        </View>
      </RoundedRectangle>
    </Pressable>
  );
};

export default HabitTaskCard;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },

  card: {
    width: '100%',
    height: 64,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#F6F6F6',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  text: {
    color: '#333',
    fontSize: 16,
  },

  completedText: {
    opacity: 0.5,
  },
});