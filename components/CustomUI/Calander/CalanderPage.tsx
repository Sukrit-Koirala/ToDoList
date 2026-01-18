import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TimeCard from './TimeArea'
import { LinearGradient } from 'expo-linear-gradient'
import CalanderHeader from './Header/CalanderHeader'
import CalendarFAB from './Header/FAB_Calander'
import { useTheme } from '../../../hooks/useTheme'

const CalanderPage = () => {
  const {theme} = useTheme();
  return (
       <LinearGradient
            colors={[theme.background, 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.56 }}
            style={styles.container}
          > 
            <View style={styles.headerContainer}> 
                <View style={styles.monthRow}>
                  <Text style={styles.monthText}>January</Text>

                  <CalendarFAB
                    onPress={() => {
                      console.log('Add event')
                    }}
                    style={{ marginLeft: 12 }}
                  />
                </View>
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
  monthText: {          // adjust as needed
    left: 23,
    zIndex: 10,
    fontSize: 26,
    color: '#fff',
    fontFamily:'PlayFairBoldExtra'
  },
  monthRow: {
  position: 'absolute',
  top: '28%',
  width:"100%",
  flexDirection: 'row',
  alignItems: 'center',
  zIndex: 10,
  // backgroundColor: '#368924'
},
})