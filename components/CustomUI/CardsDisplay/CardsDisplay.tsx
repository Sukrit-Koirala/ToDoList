import React, { useRef, useState } from 'react'
import { ScrollView, StyleSheet, View, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import Card from '../Cards/Cards'
import { useTheme } from '../../../hooks/useTheme'

export interface Group {
  id: string
  name: string
  completed: number
  total: number
}

export interface CardContainerProps {
  groups: Group[]
}

const CARD_WIDTH = 200
const CARD_SPACING = 24

const CardContainer: React.FC<CardContainerProps> = ({ groups }) => {
  const { theme } = useTheme()
  const scrollRef = useRef<ScrollView>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const cardColors = [
    theme.cardThemes.colorOne,
    theme.cardThemes.colorTwo,
    theme.cardThemes.colorThree,
  ]

  // called when user finishes a swipe / momentum scroll
  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x
    const index = Math.round(offsetX / (CARD_WIDTH + CARD_SPACING))
    setActiveIndex(index)
  }

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      snapToInterval={CARD_WIDTH + CARD_SPACING} // slide effect
      decelerationRate="fast"
      onMomentumScrollEnd={handleMomentumScrollEnd} // determines active card after swipe
    >
      {groups.map((group, index) => (
        <Card
          key={group.id}
          title={group.name}
          color={cardColors[index % cardColors.length]}
          subtitle={`${group.completed} / ${group.total} completed`}
          completed={group.completed}
          total={group.total}
          style={{ opacity: index === activeIndex ? 1 : 0.5 }}
        />
      ))}
    </ScrollView>
  )
}

export default CardContainer

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: CARD_SPACING,
  },
})
