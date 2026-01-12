import React from 'react';
import { Animated, Text, TouchableOpacity } from 'react-native';

import { PickerItemProps } from './SelectGroupModal.types';
import { styles, COLORS, ITEM_HEIGHT, ANIMATION_CONFIG } from './SelectGroupModal.styles';

export const PickerItem: React.FC<PickerItemProps> = ({
  item,
  index,
  scrollY,
  isInitialized,
  selectedIndex,
  onPress,
}) => {
  const isSelected = index === selectedIndex;

  const createInputRange = (itemIndex: number): number[] => [
    (itemIndex - 2) * ITEM_HEIGHT,
    (itemIndex - 1) * ITEM_HEIGHT,
    itemIndex * ITEM_HEIGHT,
    (itemIndex + 1) * ITEM_HEIGHT,
    (itemIndex + 2) * ITEM_HEIGHT,
  ];

  const inputRange = createInputRange(index);

  const opacity = scrollY.interpolate({
    inputRange,
    outputRange: ANIMATION_CONFIG.OPACITY_RANGE,
    extrapolate: 'clamp',
  });

  const scale = scrollY.interpolate({
    inputRange,
    outputRange: ANIMATION_CONFIG.SCALE_RANGE,
    extrapolate: 'clamp',
  });

  const textColor = scrollY.interpolate({
    inputRange,
    outputRange: [
      COLORS.text,
      COLORS.text,
      COLORS.textSelected,
      COLORS.text,
      COLORS.text,
    ],
    extrapolate: 'clamp',
  });

  const animatedStyle = {
    opacity: isInitialized ? opacity : isSelected ? 1 : 0.4,
    transform: [{ 
      scale: isInitialized ? scale : isSelected ? 1.05 : 0.85 
    }],
  };

  const animatedTextStyle = {
    color: isInitialized ? textColor : isSelected ? COLORS.textSelected : COLORS.text,
  };

  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.6}
      style={styles.pickerItem}
    >
      <Animated.View style={animatedStyle}>
        <Animated.Text style={[
          styles.pickerText,
          animatedTextStyle,
          isSelected && { fontWeight: '600' }
        ]}>
          {item.name}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};