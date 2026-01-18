import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../../../hooks/useTheme'

interface DateSlotsProps {
  day: string
  date: number
  active?: boolean
}

const DateSlots: React.FC<DateSlotsProps> = ({
  day,
  date,
  active = false,
}) => {
  const {theme} = useTheme();
  return (
    <View style={[styles.container, active && {backgroundColor: theme.headerBackground}]}>
      <Text style={styles.day}>{day}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  )
}

export default DateSlots

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 64,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  day: {
    fontSize: 12,
    color: '#ffff',
    fontWeight: '500',
    opacity: 0.75,
  },
  date: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginTop: 4,
  },
})
