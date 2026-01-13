import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RoundedRectangle from '../RoundedRectangle/RoundedRectangle';
import { Ionicons } from '@expo/vector-icons';

export interface TaskCardProps {
  text?: string;
  radius?: number;
}

const TaskCard = ({ text, radius = 12 }: TaskCardProps) => {
  return (
    <View style={styles.wrapper}>
      <RoundedRectangle
        backgroundColor="#F6F6F6"
        radius={radius}
        style={styles.card}
      >
        <View style={styles.content}>
          <Ionicons
            name="checkmark-circle-outline"
            size={22}
            color="#555"
          />
          <Text style={styles.text}>
            {text || 'Default Task Card'}
          </Text>
        </View>
      </RoundedRectangle>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },

  card: {
    width: '100%',
    height: 64, // ✅ fixed, predictable height
    justifyContent: 'center',
    paddingHorizontal: 16, // inner spacing
    backgroundColor: '#F6F6F6',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center', // ✅ vertical alignment
    gap: 12, // ✅ clean spacing between icon & text
  },

  text: {
    color: '#333',
    fontSize: 16,
  },
});
