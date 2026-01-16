import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

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
  return (
    <View style={[styles.container, active && styles.active]}>
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
  active: {
    backgroundColor: '#7e7e7e',
  },
  day: {
    fontSize: 12,
    color: '#ddd',
    fontWeight: '500',
    opacity: 0.6,
  },
  date: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginTop: 4,
  },
})
