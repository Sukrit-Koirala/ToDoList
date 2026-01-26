// TimeRow.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../../../../hooks/useTheme'

interface TimeRowProps {
  label: string
}

export const TimeRow: React.FC<TimeRowProps> = ({ label }) => {
  const {theme} = useTheme();
  return (
    <View style={styles.row}>
      {/* Time text column */}
      <View style={styles.timeColumn}>
        <Text style={[styles.timeText,{color:theme.headerText}]}>{label}</Text>
      </View>

      {/* Dot column + line */}
      <DotColumn />
      <HourLine />
    </View>
  )
}

const DotColumn = () => {
  return (
    <View style={styles.dotColumn}>
      <View style={styles.hourDot} />
      <View style={styles.subDotSmall} />
      <View style={styles.subDotMedium} />
      <View style={styles.subDotSmall} />
    </View>
  )
}

const HourLine = () => {
  return (
    <View style={styles.dottedLineWrapper}>
      <View style={styles.dottedLine} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  timeColumn: {
    width: 60,
    alignItems: 'flex-end',
    paddingRight: 16,
    marginTop: 6,
  },

  timeText: {
    fontSize: 12,
    fontWeight: '600',
  },

  dotColumn: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },

  hourDot: {
    width: 12,
    height: 4,
    backgroundColor: '#000000',
    opacity: 0.30,
  },

  subDotSmall: {
    width: 6,
    height: 2,
    backgroundColor: '#000000',
    opacity: 0.10,
  },

  subDotMedium: {
    width: 9,
    height: 3,
    backgroundColor: '#000000',
    opacity: 0.20,
  },

  dottedLineWrapper: {
    flex: 1,
    height: 3,
    marginTop: 12.5,
    paddingLeft: 8,
    overflow: 'hidden',
  },

  dottedLine: {
    flex: 1,
    borderWidth: 12,
    borderColor: '#959595',
    borderStyle: 'dotted',
    opacity: 0.4,
  },
})
