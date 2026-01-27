import { StyleSheet, Text, View, ActivityIndicator, Animated } from 'react-native'
import React, { useMemo, useState, useRef, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import CalendarHeader from './Header/CalanderHeader'
import CalendarFAB from './Header/FAB_Calander'
import { useTheme } from '../../../hooks/useTheme'
import { useQuery } from '@tanstack/react-query'
import { getTodosByDate } from '../../../api/todos'
import TimeContainer from './TimeArea/TimeArea'

const CalendarPage = () => {
  const { theme } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const animatedValue = useRef(new Animated.Value(0)).current

  // Format date as YYYY-MM-DD for the API
  const formattedDate = useMemo(() => {
    return selectedDate.toISOString().split('T')[0]
  }, [selectedDate])

const { data: todos = [], isLoading } = useQuery({
  queryKey: ['todos', formattedDate],
  queryFn: async () => {
    const result = await getTodosByDate(formattedDate)
    console.log('getTodosByDate result for', formattedDate, ':', result)
    return result
  },
})

  // Get current month dynamically
  const currentMonth = useMemo(() => {
    return selectedDate.toLocaleString('en-US', { month: 'long' })
  }, [selectedDate])

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: isExpanded ? 1 : 0,
      useNativeDriver: false,
      tension: 50,
      friction: 7,
    }).start()
  }, [isExpanded])

  const headerHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [180, 520], // Collapsed: 180, Expanded: 520
  })

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  

  if (isLoading) {
    return (
      <LinearGradient
        colors={[theme.background, theme.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.9 }}
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
      colors={[theme.background, theme.fadedBackground]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.9 }}
      style={styles.container}
    > 
      <Animated.View style={[styles.headerContainer, { height: headerHeight }]}> 
        <View style={styles.monthRow}>
          <Text style={styles.monthText}>{currentMonth}</Text>

          <CalendarFAB
            onPress={() => setIsExpanded(!isExpanded)}
            style={styles.fabStyle}
          />
        </View>
        <CalendarHeader 
          isExpanded={isExpanded} 
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />
      </Animated.View>

    <View style={styles.timeBlockContainer}>
      <TimeContainer  selectedDate={selectedDate} />
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
    width: '100%',
  },
  timeBlockContainer: {
    flex: 1,
  },
  monthText: {
    left: 23,
    fontSize: 26,
    color: '#fff',
    fontFamily: 'PlayFairBoldExtra',
  },
  monthRow: {
    position: 'absolute',
    top: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    paddingHorizontal: 0,
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