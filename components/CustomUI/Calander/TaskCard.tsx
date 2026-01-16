import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RoundedRectangle from '../RoundedRectangle/RoundedRectangle'
import { Ionicons } from '@expo/vector-icons'

/* ---------- Types ---------- */
interface TaskCardProps {
  title: string
  description?: string
  startHour: number
  startMinute?: number
  durationMinutes?: number
  active?: boolean
}

/* ---------- Constants ---------- */
const SLOT_HEIGHT = 80

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  gym: 'barbell',
  workout: 'fitness',
  meeting: 'people',
  call: 'call',
  study: 'book',
  code: 'code-slash',
  class: 'school',
  sleep: 'moon',
  coffee: 'cafe',
  lunch: 'fast-food',
  dinner: 'restaurant',
  email: 'mail',
  grocery: 'cart',
  travel: 'airplane',
  meditate: 'leaf',
}

/* ---------- Variant Config ---------- */
const VARIANT_CONFIG = {
  compact: {
    iconSize: 8,
    iconBox: 16,
    showDescription: false,
    paddingLeft: 2,
    titleSize: 14,
    rectBorder: 8,
    cardRoundness: 6,
  },
  medium: {
    iconSize: 20,
    iconBox: 32,
    showDescription: false,
    paddingLeft: 4,
    titleSize: 14,
    rectBorder: 16,
    cardRoundness: 12,
  },
  full: {
    iconSize: 32,
    iconBox: 48,
    showDescription: true,
    paddingLeft: 8,
    titleSize: 16,
    rectBorder: 32,
    cardRoundness: 20,
  },
} as const

/* ---------- Helpers ---------- */
const getVariant = (duration: number) => {
  if (duration <= 15) return 'compact'
  if (duration <= 30) return 'medium'
  return 'full'
}

const getIconForTitle = (title: string) => {
  const firstWord = title.trim().split(' ')[0].toLowerCase()
  return ICON_MAP[firstWord] ?? 'ellipse'
}

/* ---------- Component ---------- */
const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  startHour,
  startMinute = 0,
  durationMinutes = 60,
  active = false,
}) => {
  const variant = getVariant(durationMinutes)
  const config = VARIANT_CONFIG[variant]

  /* ----- Positioning (static) ----- */
  const top =
    ((startHour * 60 + startMinute) / 60) * SLOT_HEIGHT

  const cardHeight =
    (durationMinutes / 60) * SLOT_HEIGHT

  const iconName = getIconForTitle(title)

  return (
    <View
      style={[
        styles.cardWrapper,
        {
          top,
          height: cardHeight,
        },
      ]}
    >
      <View style={[styles.shadowWrapper, active && styles.activeShadow]}>
        <RoundedRectangle
          radius={config.cardRoundness}
          backgroundColor="#ffffff"
        >
          <View style={styles.row}>
            {/* Icon */}
            <View
              style={[
                styles.iconContainer,
                {
                  width: config.iconBox,
                  height: config.iconBox,
                  borderRadius: config.rectBorder,
                },
              ]}
            >
              <Ionicons
                name={iconName}
                size={config.iconSize}
                color="#ffffff"
              />
            </View>

            {/* Text */}
            <View
              style={[
                styles.textContainer,
                { paddingLeft: config.paddingLeft },
              ]}
            >
              <Text
                style={[styles.title, { fontSize: config.titleSize }]}
                numberOfLines={1}
              >
                {title}
              </Text>

              {config.showDescription && description && (
                <Text style={styles.description} numberOfLines={2}>
                  {description}
                </Text>
              )}
            </View>
          </View>
        </RoundedRectangle>
      </View>
    </View>
  )
}

export default TaskCard

const styles = StyleSheet.create({
  cardWrapper: {
    position: 'absolute',
    left: 70,
    right: 16,
    marginLeft: 8,
    width: '77%',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },

  shadowWrapper: {
    flex: 1,
    borderRadius: 12,
  },

  activeShadow: {
    // iOS
    shadowColor: '#101010',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    // Android
    elevation: 10,
  },

  iconContainer: {
    marginLeft: 8,
    marginRight: 12,
    backgroundColor: '#101010',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#101010',
    fontWeight: '600',
  },

  description: {
    color: '#444',
    fontSize: 12,
    marginTop: 2,
  },
})
