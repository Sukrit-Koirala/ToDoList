import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RoundedRectangle from '../RoundedRectangle/RoundedRectangle'
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const CARD_WIDTH = width * 0.55; // 45% of screen width
const CARD_HEIGHT = CARD_WIDTH * 0.66; // maintain aspect ratio

const Card = () => {
  return (
    <View>
      <RoundedRectangle style={styles.card} radius={30}>
        <Text>Title</Text>
      </RoundedRectangle>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#101010',
    }
})