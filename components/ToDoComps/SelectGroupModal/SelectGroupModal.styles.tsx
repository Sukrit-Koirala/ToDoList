import { StyleSheet, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const ITEM_HEIGHT = 44;
export const VISIBLE_ITEMS = 5;
export const PADDING_ITEMS = 2;

export const COLORS = {
  backdrop: 'rgba(0, 0, 0, 0.4)',
  background: '#F9F9F9',
  header: '#FFFFFF',
  headerBorder: '#E5E5E5',
  primary: '#007AFF',
  text: '#000',
  textSelected: '#007AFF',
  selectionBg: 'rgba(0, 122, 255, 0.05)',
  selectionShadow: 'rgba(0, 0, 0, 0.1)',
  gradientTop: 'rgba(249, 249, 249, 0)',
  gradientMid: 'rgba(249, 249, 249, 0.95)',
};

export const ANIMATION_CONFIG = {
  INITIAL_SCROLL_DELAY: 150,
  MODAL_CLOSE_DURATION: 250,
  SPRING_CONFIG: {
    tension: 65,
    friction: 11,
  },
  OPACITY_RANGE: [0.2, 0.4, 1, 0.4, 0.2],
  SCALE_RANGE: [0.75, 0.85, 1.05, 0.85, 0.75],
};

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.backdrop,
  },

  bottomSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingBottom: 34,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.header,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.headerBorder,
  },

  headerTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    letterSpacing: -0.08,
  },

  cancelButton: {
    fontSize: 17,
    color: COLORS.primary,
    fontWeight: '400',
  },

  doneButton: {
    fontSize: 17,
    color: COLORS.primary,
    fontWeight: '600',
  },

  pickerContainer: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    position: 'relative',
    overflow: 'hidden',
  },

  selectionIndicator: {
    position: 'absolute',
    top: ITEM_HEIGHT * PADDING_ITEMS,
    left: 16,
    right: 16,
    height: ITEM_HEIGHT,
    backgroundColor: COLORS.selectionBg,
    borderRadius: 8,
    zIndex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
  },

  pickerItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pickerText: {
    fontSize: 24,
    color: COLORS.text,
    fontWeight: '400',
    letterSpacing: -0.3,
  },

  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
});