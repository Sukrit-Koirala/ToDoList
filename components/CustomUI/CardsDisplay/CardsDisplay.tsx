import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Card from '../Cards/Cards'

/* ---------- Types ---------- */

export interface Group {
  id: string
  name: string
  color: string
  completed: number
  total:number
}

export interface CardContainerProps {
  groups: Group[]
}

/* ---------- CardContainer ---------- */

const CardContainer: React.FC<CardContainerProps> = ({ groups }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {groups.map(group => (
        <Card
          key={group.id}
          title={group.name}
          color={group.color}
          subtitle={`${group.completed} / ${group.total} completed`}
          completed={group.completed}
          total={group.total}
        />

      ))}
    </ScrollView>
  )
}

export default CardContainer

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 24,
  },
})
