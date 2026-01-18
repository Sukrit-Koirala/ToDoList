import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import RoundedRectangle from '../RoundedRectangle/RoundedRectangle';
import { Dimensions } from 'react-native';
import CircularProgress from '../CircularProgress/CircularProgress';
import { useTheme } from '../../../hooks/useTheme';

const { width } = Dimensions.get('window');

const CARD_WIDTH = width * 0.55; // 55% of screen width
const CARD_HEIGHT = CARD_WIDTH * 0.66; // maintain aspect ratio

export interface CardProps {
  title?: string;
  subtitle?: string;
  color?: string;
  completed: number;
  total: number;
  style?: StyleProp<ViewStyle>;
}

const Card: React.FC<CardProps> = ({ 
  title = 'Title Here', 
  subtitle = 'Subtitle Here', 
  color = "#101010", 
  style,
  completed, 
  total 
}) => {
  const {theme} = useTheme();
  return (

    <View style={style}>
      <RoundedRectangle style={[styles.card, { backgroundColor: color }]} radius={30}>
        <View style={styles.contentRow}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          
          <CircularProgress 
            completed={completed} 
            total={total}
            size={70}
            strokeWidth={8}
          />
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
    padding: 16,
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row', // Places items side by side
    alignItems: 'center', // Vertically centers the items
    justifyContent: 'space-between', // Spreads them apart
  },
  textContainer: {
    flex: 1, // Takes up remaining space
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: 12, // Adds space between text and circle
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#dcdcdc',
  },
});