import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TimeCard from './TimeArea'
import { LinearGradient } from 'expo-linear-gradient'
import CalanderHeader from './Header/CalanderHeader'

const CalanderPage = () => {
  return (
       <LinearGradient
            colors={['#101010', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.56 }}
            style={styles.container}
          > 



            <View style={styles.headerContainer}> 
                <Text style={styles.monthText}>January</Text>
                <CalanderHeader />
            </View>

            <View style={styles.timeBlockContainer}>
                <TimeCard />
            </View>
      </LinearGradient>
  )
}

export default CalanderPage

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.25,
      position: 'relative',
  },
  timeBlockContainer: {
    flex: 0.75,
  },
  monthText: {
    position: 'absolute',
    top: "24%",           // adjust as needed
    left: 23,
    zIndex: 10,
    fontSize: 26,
    color: '#fff',
    fontFamily:'PlayFairBoldExtra'
  }

})