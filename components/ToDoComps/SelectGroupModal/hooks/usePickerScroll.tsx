import { useRef, useState, useEffect, useCallback } from 'react';
import { Animated, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { ITEM_HEIGHT, ANIMATION_CONFIG } from '../SelectGroupModal.styles';

export const usePickerScroll = (
  visible: boolean,
  currentIndex: number
) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isInitialized, setIsInitialized] = useState(false);

  const scrollToIndex = useCallback((index: number, animated: boolean = false) => {
    scrollViewRef.current?.scrollTo({
      y: index * ITEM_HEIGHT,
      animated,
    });
  }, []);

  const initializeScroll = useCallback(() => {
    setTimeout(() => {
      scrollToIndex(currentIndex, false);
      setIsInitialized(true);
    }, ANIMATION_CONFIG.INITIAL_SCROLL_DELAY);
  }, [currentIndex, scrollToIndex]);

  useEffect(() => {
    if (visible) {
      initializeScroll();
    } else {
      setIsInitialized(false);
    }
  }, [visible, initializeScroll]);

  useEffect(() => {
    scrollY.setValue(currentIndex * ITEM_HEIGHT);
  }, [currentIndex, scrollY]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const index = Math.round(offsetY / ITEM_HEIGHT);
      scrollToIndex(index, true);
      return index;
    },
    [scrollToIndex]
  );

  return {
    scrollViewRef,
    scrollY,
    isInitialized,
    handleScroll,
    handleMomentumScrollEnd,
  };
};