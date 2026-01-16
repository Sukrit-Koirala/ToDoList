import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CalanderPage from '../../components/CustomUI/Calander/CalanderPage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const calander = () => {
  return (
    <GestureHandlerRootView>
          <CalanderPage />
    </GestureHandlerRootView>

  )
}

export default calander

const styles = StyleSheet.create({
});