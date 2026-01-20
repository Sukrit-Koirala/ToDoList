import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, NativeScrollEvent, NativeSyntheticEvent, TouchableOpacity } from 'react-native';
import Card from '../Cards/Cards';
import { useTheme } from '../../../hooks/useTheme';
import { useModal } from '../Modal/ModalContext'; // make sure this exists

export interface Group {
  id: string;
  name: string;
  completed: number;
  total: number;
}

export interface CardContainerProps {
  groups: Group[];
}

const CARD_WIDTH = 200;
const CARD_SPACING = 24;

const CardContainer: React.FC<CardContainerProps> = ({ groups }) => {
  const { theme } = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { openModal } = useModal(); // context to open modal

  const cardColors = [
    theme.cardThemes.colorOne,
    theme.cardThemes.colorTwo,
    theme.cardThemes.colorThree,
  ];

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (CARD_WIDTH + CARD_SPACING));
    setActiveIndex(index);
  };

  const handleCardPress = (group: Group, color: string) => {
    openModal('GROUP_DETAIL', { group, cardColor: color });
  };

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      snapToInterval={CARD_WIDTH + CARD_SPACING}
      decelerationRate="fast"
      onMomentumScrollEnd={handleMomentumScrollEnd}
    >
      {groups.map((group, index) => {
        const color = cardColors[index % cardColors.length];
        return (
          <TouchableOpacity
            key={group.id}
            onPress={() => handleCardPress(group, color)}
            activeOpacity={0.8}
          >
            <Card
              title={group.name}
              color={color}
              subtitle={`${group.completed} / ${group.total} completed`}
              completed={group.completed}
              total={group.total}
              style={{ opacity: index === activeIndex ? 1 : 0.5 }}
              
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default CardContainer;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: CARD_SPACING,
  },
});
