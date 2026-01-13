import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RoundedRectangle from '../RoundedRectangle/RoundedRectangle';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CARD_WIDTH = width * 0.55; // 55% of screen width
const CARD_HEIGHT = CARD_WIDTH * 0.66; // maintain aspect ratio

export interface CardProps {
  title?: string;
  subtitle?: string;
}

const Card: React.FC<CardProps> = ({ title = 'Title Here', subtitle = 'Subtitle Here' }) => {
  return (
    <View>
      <RoundedRectangle style={styles.card} radius={30}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </RoundedRectangle>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#101010',
    padding: 16,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'flex-start', 
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#aaa',
  },
});
