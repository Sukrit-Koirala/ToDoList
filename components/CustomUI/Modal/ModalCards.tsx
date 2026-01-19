import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import RoundedRectangle from '../RoundedRectangle/RoundedRectangle'
import { useTheme } from '../../../hooks/useTheme'
import { Ionicons } from '@expo/vector-icons'
import { getTaskIcon } from '../utils/taskIcons'
import CircularProgress from '../CircularProgress/CircularProgress'
import SearchBar from './SearchBar'


interface ModalCardsProps {
  title: string
  completed: number
  total: number
  onPress?: () => void
  active?: boolean
}

const ModalCards: React.FC<ModalCardsProps> = ({
  title,
  completed,
  total,
  onPress,
  active = false,
}) => {
  const { theme } = useTheme()
  const iconName = getTaskIcon(title)

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <RoundedRectangle
        radius={20}
        style={[
          styles.cardBg,
          {
            backgroundColor: active ? theme.background : 'white',
            padding: active ? 19 : 16,
          },
        ]}
      >
        <View style={styles.row}>
          {/* LEFT SIDE */}
          <View style={styles.left}>
            <View
              style={[
                styles.iconContainer,
                {
                  width: active ? 52 : 48,
                  height: active ? 52 : 48,
                  backgroundColor: active
                    ? theme.headerBackground
                    : '#101010',
                },
              ]}
            >
              <Ionicons
                name={iconName}
                size={active ? 32 : 26}
                color="white"
              />
            </View>

            <View>
              <Text
                style={[
                  styles.title,
                  {
                    color: active ? 'white' : '#101010',
                    fontSize: active ? 20 : 18,
                  },
                ]}
              >
                {title}
              </Text>

              <Text
                style={[
                  styles.subText,
                  {
                    color: active ? 'white' : '#101010',
                    fontSize: active ? 16 : 12,
                  },
                ]}
              >
                {completed} of {total} completed
              </Text>
            </View>
          </View>

          {/* RIGHT SIDE – ACTIVE ONLY */}
          {active && (
            <CircularProgress
              completed={completed}
              total={total}
              size={56}
              strokeWidth={6}
              color="#ffffff"
              backgroundColor= '#ffffff'
            />
          )}
        </View>
      </RoundedRectangle>
    </Pressable>
  )
}

export default ModalCards

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  cardBg: {
    width: '100%',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // pushes progress to the right
  },
  iconContainer: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    fontFamily: 'PlayFair-Bold',
  },
  subText: {
    fontSize: 14,
  },
})
