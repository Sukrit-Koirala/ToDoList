import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RoundedRectangle from '../../RoundedRectangle/RoundedRectangle'

const CalanderHeader = () => {
  return (
    <View>
      <RoundedRectangle radius={20} style={styles.headerContainer} />
    </View>
  )
}

export default CalanderHeader

const styles = StyleSheet.create({
    headerContainer: {
        marginHorizontal: 20,
        backgroundColor: '#ff0000',
        height: 50,
        marginTop: 40,
        marginBottom: 10,
    }
})