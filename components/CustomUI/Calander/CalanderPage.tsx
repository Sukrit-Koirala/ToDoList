import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useMemo } from 'react'
import TimeCard from './TimeArea'
import { LinearGradient } from 'expo-linear-gradient'
import CalendarHeader from './Header/CalanderHeader'
import CalendarFAB from './Header/FAB_Calander'
import { useTheme } from '../../../hooks/useTheme'
import { useQuery } from '@tanstack/react-query'
import { getTodos } from '../../../api/todos'

const CalendarPage = () => {
  const { theme } = useTheme()

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  // Get current month dynamically
  const currentMonth = useMemo(() => {
    return new Date().toLocaleString('en-US', { month: 'long' })
  }, [])

  if (isLoading) {
    return (
      <LinearGradient
        colors={[theme.background, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.56 }}
        style={styles.container}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </LinearGradient>
    )
  }

  return (
    <LinearGradient
      colors={[theme.background, 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.56 }}
      style={styles.container}
    > 
      <View style={styles.headerContainer}> 
        <View style={styles.monthRow}>
          <Text style={styles.monthText}>{currentMonth}</Text>

          <CalendarFAB
            onPress={() => {
              console.log('Add event')
            }}
            style={styles.fabStyle}
          />
        </View>
        <CalendarHeader />
      </View>

      <View style={styles.timeBlockContainer}>
        <TimeCard todos={todos} />
      </View>
    </LinearGradient>
  )
}

export default CalendarPage

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
    left: 23,
    zIndex: 10,
    fontSize: 26,
    color: '#fff',
    fontFamily: 'PlayFairBoldExtra',
  },
  monthRow: {
    position: 'absolute',
    top: '28%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  fabStyle: {
    marginLeft: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})