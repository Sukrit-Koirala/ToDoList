import { StyleSheet, View } from 'react-native'
import React from 'react'
import { TimeRow } from './TimeRow'


interface TimeSlotProps {
  label: string
  height?: number
}

const TimeSlot: React.FC<TimeSlotProps> = ({ label, height = 80 }) => {
  return (
    <View style={[styles.container, { height }]}>
      <TimeRow label={label} />
    </View>
  )
}

export default TimeSlot

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
})
