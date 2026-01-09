import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ToDoProvider } from '../../contexts/ToDoContext/ToDoProvider'
import ToDoHeader from "../ToDoComps/ToDoHeader/ToDoHeader"

const ToDoScreen = () => {
  return (
    <ToDoProvider>
        <ToDoHeader/>
    </ToDoProvider>

  )
}
export default ToDoScreen

const styles = StyleSheet.create({})