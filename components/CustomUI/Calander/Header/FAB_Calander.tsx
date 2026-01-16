import React from 'react'
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface CalendarFABProps {
  onPress?: () => void
  style?: ViewStyle
}

const CalendarFAB: React.FC<CalendarFABProps> = ({
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.fab, style]}
    >
      <Ionicons name="calendar-outline" size={18} color="#fff" style={{alignSelf:'center'}} />
    </TouchableOpacity>
  )
}

export default CalendarFAB

const styles = StyleSheet.create({
  fab: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#7e7e7e',
    left: '60%',
    top:4,
    justifyContent:'center',
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    // Android shadow
    elevation: 6,
  },
})


