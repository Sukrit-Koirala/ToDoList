// modal/OpenBoardsModal.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import RoundedRectangle from '../RoundedRectangle/RoundedRectangle';
import ModalCards from './ModalCards';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getGroups } from '../../../api/groups';
import { getTodos } from '../../../api/todos';
import SearchBar from './SearchBar'; // Import the search bar
import { useTheme } from '../../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

export default function OpenBoardsModal({ sheetRef, snapPoints, onClose, renderBackdrop }: any) {
  
  const queryClient = useQueryClient();
  const {theme} = useTheme();
  const { data: groups = [] } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups,
  });

  const { data: todos = [] } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  const groupsWithStats = groups.map(group => {
    const groupTodos = todos.filter(todo => todo.groupId === group.id);
    const completedCount = groupTodos.filter(t => t.completed).length;
    const total = groupTodos.length;
    return {
      ...group,
      completed: completedCount,
      total,
    };
  });

  return (
    <BottomSheetModal 
      ref={sheetRef} 
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      onDismiss={onClose}
      enableDynamicSizing={false}
    >
      <View style={styles.content}>
        <RoundedRectangle radius={20} style={styles.background} />

        <View style={styles.innerContent}>
          <Text style={styles.title}>Boards</Text>
          <Text style={styles.subTitle}>Pick a board you would like to work on</Text>

          {/* GLOBAL SEARCH BAR */}
          <View style={styles.searchWrapper}>
            <SearchBar
              placeholder="Search boards..."
              style={[styles.searchBar,{backgroundColor:'#d7d7d7'}]}
            />
          </View>

          {/* LIST OF BOARDS */}
          <BottomSheetScrollView contentContainerStyle={styles.scrollContainer}>
            {groupsWithStats.length > 0 ? (
              groupsWithStats.map((group: any, index: number) => (
                <ModalCards
                  key={group.id}
                  title={group.name}
                  completed={group.completed}
                  total={group.total}
                  active={index === 0} // active only for first
                  onPress={() => console.log('Selected board:', group.id)}
                />
              ))
            ) : (
              <Text>No boards yet</Text>
            )}
          </BottomSheetScrollView>

          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <Ionicons name="close" size={26} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.fab,{backgroundColor:theme.background}]}
            onPress={() => {
              console.log('Quick Add pressed');
              // later: open add-board or add-task modal
            }}
            activeOpacity={0.85}
          >
            <Ionicons name="add" size={22} color="#fff" />
            <Text style={styles.fabText}>Quick Add</Text>
          </TouchableOpacity>

        </View>
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ececec',
  },
  innerContent: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26, 
    fontFamily: 'PlayFair',
    alignSelf: 'center',
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'PlayFair',
    alignSelf: 'center',
    marginBottom: 12,
  },
  searchWrapper: {
    marginBottom: 16, // spacing between search bar and board list
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    height: 48,
    paddingHorizontal: 12,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
 closeIcon: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 10,
    padding: 8,
  },
  closeText: {
    color: 'white',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    flexDirection: 'row',
    alignSelf:'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 26,
    elevation: 6, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },

  fabText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },

});
