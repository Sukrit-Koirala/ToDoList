import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ToDoProvider } from '../../contexts/ToDoContext/ToDoProvider'
import ToDoHeader from "../ToDoComps/ToDoHeader/ToDoHeader"
import { LinearGradient } from 'expo-linear-gradient'

const ToDoScreen = () => {
  return (
      <LinearGradient
      colors={['#0F172A', 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.6 }}
      style={{ flex: 1 }}
    >
    </LinearGradient>
  )
}
export default ToDoScreen

const styles = StyleSheet.create({})