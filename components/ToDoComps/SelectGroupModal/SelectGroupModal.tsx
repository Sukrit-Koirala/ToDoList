import { useCallback } from "react";
import { useGroupSelection } from "./hooks/useGroupSelection";
import { useModalAnimation } from "./hooks/useModalAnimation";
import { usePickerScroll } from "./hooks/usePickerScroll";
import { SelectGroupModalProps } from "./SelectGroupModal.types";
import { ITEM_HEIGHT, PADDING_ITEMS, styles } from "./SelectGroupModal.styles";
import { Animated, Modal, TouchableOpacity, View } from "react-native";
import { ModalHeader } from "./ModalHeader";
import { PickerItem } from "./PickerItem";




export const SelectGroupModal: React.FC<SelectGroupModalProps> = ({
  visible,
  onClose,
  groups,
  currentGroupId,
  onSelectGroup,
}) => {
    const slideAnim = useModalAnimation(visible);
    const { selectedIndex, setSelectedIndex, getSelectedGroup } = useGroupSelection(
    groups,
    currentGroupId
    );

    const {
    scrollViewRef,
    scrollY,
    isInitialized,
    handleScroll,
    handleMomentumScrollEnd,
    } = usePickerScroll(visible, selectedIndex);

      const handleDone = useCallback(() => {
    const group = getSelectedGroup();
    if (group) {
      onSelectGroup(group);
    }
    onClose();
  }, [getSelectedGroup, onSelectGroup, onClose]);

  const handleItemPress = useCallback((index: number) => {
    setSelectedIndex(index);
    scrollViewRef.current?.scrollTo({
      y: index * ITEM_HEIGHT,
      animated: true,
    });
  }, [setSelectedIndex, scrollViewRef]);

  const onScrollEnd = useCallback(
    (event: any) => {
      const newIndex = handleMomentumScrollEnd(event);
      setSelectedIndex(newIndex);
      
      // Preview the group in the background
      const group = groups[newIndex];
      if (group) {
        onSelectGroup(group);
      }
    },
    [handleMomentumScrollEnd, setSelectedIndex, groups, onSelectGroup]
  );

    return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <Animated.View
          style={[
            styles.bottomSheet,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <ModalHeader onCancel={onClose} onDone={handleDone} />

          <View style={styles.pickerContainer}>
            <View style={styles.selectionIndicator} pointerEvents="none" />

            <Animated.ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              onScroll={handleScroll}
              onMomentumScrollEnd={onScrollEnd}
              scrollEventThrottle={16}
              contentContainerStyle={styles.scrollContent}
            >
              <View style={{ height: ITEM_HEIGHT * PADDING_ITEMS }} />

              {groups.map((item, index) => (
                <PickerItem
                  key={item.id}
                  item={item}
                  index={index}
                  scrollY={scrollY}
                  isInitialized={isInitialized}
                  selectedIndex={selectedIndex}
                  onPress={() => handleItemPress(index)}
                />
              ))}

              <View style={{ height: ITEM_HEIGHT * PADDING_ITEMS }} />
            </Animated.ScrollView>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SelectGroupModal;