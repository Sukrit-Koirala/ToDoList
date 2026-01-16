import { StyleSheet, View } from 'react-native'
import React from 'react'
import RoundedRectangle from '../../RoundedRectangle/RoundedRectangle'
import DateSlots from './DateSlots'

const CalendarHeader = () => {
  return (
    <RoundedRectangle radius={20} style={styles.headerContainer} backgroundColor='transparent'>
      <View style={styles.dateRow}>
        <DateSlots day="Mon" date={15} />
        <DateSlots day="Tue" date={16} active />
        <DateSlots day="Wed" date={17} />
        <DateSlots day="Thu" date={18} />
        <DateSlots day="Fri" date={19} />
        <DateSlots day="Sat" date={20} />
        <DateSlots day="Sun" date={21} />
      </View>
    </RoundedRectangle>
  )
}

export default CalendarHeader

const styles = StyleSheet.create({
    headerContainer: {
        height: '45%',
        width: '100%',
        marginVertical: 104,
        paddingHorizontal: 8,
    },
    dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})