import React from 'react'
import { View, TextInput, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface SearchBarProps {
  style?: StyleProp<ViewStyle>
  placeholder?: string
  editable?: boolean
}

const SearchBar: React.FC<SearchBarProps> = ({
  style,
  placeholder = 'Search',
  editable = false,
}) => {
  return (
    <View style={style}>
      <Ionicons name="search" size={14} />
      <TextInput
        placeholder={placeholder}
        style={{ flex: 1 }}
        editable={editable}
      />
    </View>
  )
}

export default SearchBar
