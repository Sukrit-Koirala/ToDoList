import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16 },

  header: { paddingHorizontal: 24, alignItems: 'center', marginBottom: 20 },

  closeIcon: {
    position: 'absolute',
    left: 16,
    padding: 8,
    zIndex: 10,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'PlayFair',
  },

  cardBg: { flex: 1 },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 26,
  },

  cardTitle: { fontSize: 17, fontWeight: '600', color: '#666' },

  moreButton: { fontSize: 24, color: '#999' },

  scrollViewWrapper: {
    backgroundColor: '#F5F5F5',
    marginTop: -21,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },

  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
  },

  quickAddButton: {
    position: 'absolute',
    bottom: 32,
    flexDirection: 'row',
    paddingHorizontal: 18,
    height: 48,
    borderRadius: 26,
    alignItems: 'center',
    elevation: 6,
  },

  quickAddIcon: { color: 'white', fontSize: 22 },

  quickAddText: {
    color: 'white',
    fontSize: 17,
    marginLeft: 8,
  },

  /* Bottom Sheet */
  sheetBg: { backgroundColor: 'white' },

  sheetHandle: { backgroundColor: '#ccc' },

  addModalContent: {
    padding: 24,
    paddingBottom: 32,
  },

  addModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
  },

  modalButtons: { flexDirection: 'row', gap: 12 },

  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  cancelButton: { backgroundColor: '#f0f0f0' },

  cancelButtonText: { color: '#666', fontWeight: '600' },

  addButton: { backgroundColor: '#1a1a1a' },

  addButtonDisabled: { opacity: 0.5 },

  addButtonText: { color: 'white', fontWeight: '600' },
})
