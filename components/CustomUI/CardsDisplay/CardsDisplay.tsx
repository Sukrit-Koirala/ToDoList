import React from 'react';
import { ScrollView, View, StyleSheet, ViewStyle } from 'react-native';
import Card from '../Cards/Cards';
/* ---------- Types ---------- */

export interface CardContainerProps {
  cardCount?: number;
}


/* ---------- CardContainer ---------- */
const CardContainer: React.FC<CardContainerProps> = ({ cardCount = 10 }) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {Array.from({ length: cardCount }).map((_, index) => (
        <Card key={index} />
      ))}
    </ScrollView>
  );
};

export default CardContainer;

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 24, // spacing between cards
  },
});
