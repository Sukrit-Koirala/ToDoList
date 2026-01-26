import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '../../../../hooks/useTheme'

interface DateSlotsProps {
  day: string
  date: number
  active?: boolean
  dimmed?: boolean
  fullDate: Date
  onPress: (date: Date) => void
}

const DateSlots: React.FC<DateSlotsProps> = ({
  day,
  date,
  active = false,
  dimmed = false,
  fullDate,
  onPress,
}) => {
  const {theme} = useTheme();
  
  return (
    <TouchableOpacity 
      onPress={() => onPress(fullDate)}
      activeOpacity={0.7}
      style={[
        styles.container, 
        active && {backgroundColor: theme.headerBackground, borderRadius: 18},
        dimmed && styles.dimmed
      ]}
    >
      <Text style={[styles.day, dimmed && styles.dimmedText]}>{day}</Text>
      <Text style={[styles.date, dimmed && styles.dimmedText]}>{date}</Text>
    </TouchableOpacity>
  )
}

export default DateSlots

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dimmed: {
    opacity: 0.3,
    borderRadius: 18,
  },
  day: {
    fontSize: 11,
    color: '#ffff',
    fontWeight: '500',
    opacity: 0.75,
  },
  date: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginTop: 2,
  },
  dimmedText: {
    opacity: 0.5,
  },
})