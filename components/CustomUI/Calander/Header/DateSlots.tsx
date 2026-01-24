import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../../../hooks/useTheme'

interface DateSlotsProps {
  day: string
  date: number
  active?: boolean
  dimmed?: boolean
}

const DateSlots: React.FC<DateSlotsProps> = ({
  day,
  date,
  active = false,
  dimmed = false,
}) => {
  const {theme} = useTheme();
  return (
    <View style={[
      styles.container, 
      active && {backgroundColor: theme.headerBackground},
      dimmed && styles.dimmed
    ]}>
      <Text style={[styles.day, dimmed && styles.dimmedText]}>{day}</Text>
      <Text style={[styles.date, dimmed && styles.dimmedText]}>{date}</Text>
    </View>
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