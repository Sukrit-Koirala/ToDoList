import { useRef, useEffect, useCallback } from 'react';
import { Animated, Dimensions } from 'react-native';
import { ANIMATION_CONFIG } from '../SelectGroupModal.styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const useModalAnimation = (visible: boolean) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const animateOpen = useCallback(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      ...ANIMATION_CONFIG.SPRING_CONFIG,
    }).start();
  }, [slideAnim]);

  const animateClose = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: ANIMATION_CONFIG.MODAL_CLOSE_DURATION,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  useEffect(() => {
    if (visible) {
      animateOpen();
    } else {
      animateClose();
    }
  }, [visible, animateOpen, animateClose]);

  return slideAnim;
};