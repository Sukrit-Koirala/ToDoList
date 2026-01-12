import { Animated } from "react-native";

export interface GroupUI {
  id: string | number;
  name: string;
}

export interface SelectGroupModalProps {
  visible: boolean;
  onClose: () => void;
  groups: GroupUI[];
  currentGroupId: string | number;
  onSelectGroup: (group: GroupUI) => void;
}

export interface PickerItemProps {
  item: GroupUI;
  index: number;
  scrollY: Animated.Value;
  isInitialized: boolean;
  selectedIndex: number;
  onPress: () => void;
}

export interface ModalHeaderProps {
  onCancel: () => void;
  onDone: () => void;
}