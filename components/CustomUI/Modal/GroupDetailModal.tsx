import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { getTodos } from '../../../api/todos'
import { useTheme } from '../../../hooks/useTheme'
import RoundedRectangle from '../RoundedRectangle/RoundedRectangle'
import TaskItem from './TaskModalCard'
import { Ionicons } from '@expo/vector-icons'

interface GroupDetailModalProps {
  group: {
    id: string
    name: string
    completed?: number
    total?: number
  }
  cardColor?: string
  onClose?: () => void
}

const GroupDetailModal: React.FC<GroupDetailModalProps> = ({
  group,
  cardColor = '#1a1a1a',
  onClose,
}) => {
  const { theme } = useTheme()

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['todos', group.id],
    queryFn: () => getTodos(),
  })

  const groupTodos = todos.filter(
    (todo: any) => todo.groupId === group.id
  )

  const completedCount = groupTodos.filter(
    (t: any) => t.completed
  ).length

  return (
    <View style={[styles.container, { backgroundColor: cardColor }]}>
      {/* HEADER */}
      <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <Ionicons name="close" size={32} color="white" />
          </TouchableOpacity>

        <View style={styles.headerTop}>
          <Text style={styles.title}>{group.name}</Text>
        </View>
      </View>

      {/* CONTENT CARD */}
      <RoundedRectangle
        radius={28}
        style={styles.cardBg}
        backgroundColor="#F5F5F5"
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Tasks</Text>
          <TouchableOpacity>
            <Text style={styles.moreButton}>⋯</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {isLoading ? (
            <Text style={styles.emptyText}>Loading...</Text>
          ) : groupTodos.length > 0 ? (
            groupTodos.map((task: any, index: number) => (
              <TaskItem
                key={task.id}
                index={index + 1}
                title={task.title}
                completed={task.completed}
                time={task.time}
                duration={task.duration}
                location={task.location}
                onToggle={() => {
                  // TODO: toggle task completion
                }}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No tasks yet</Text>
          )}
        </ScrollView>
      </RoundedRectangle>

      {/* BOTTOM ACTION */}
      {onClose && (
        <TouchableOpacity
          onPress={() => {
            console.log('Quick Add pressed');
            // later: open add task modal
          }}
          style={[styles.quickAddButton,{backgroundColor: cardColor || '#101010'}]}
        >
          <Text style={styles.quickAddIcon}>+</Text>
          <Text style={styles.quickAddText}>Quick Add</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default GroupDetailModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },

  header: {
    paddingHorizontal: 24,
    marginBottom: 20,
    alignItems: 'center',
  },
   closeIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
    padding: 8,
  },

  headerTop: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    color: 'white',
    letterSpacing: -0.5,
    fontFamily: 'PlayFair',
  },

  closeButton: {
    position: 'absolute',
    top: -8,
    left: 0,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  closeButtonText: {
    color: 'white',
    fontSize: 26,
  },

  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'PlayFair',
  },

  cardBg: {
    flex: 1,
    marginHorizontal: 0,
    marginTop: 8,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 26,
    paddingTop: 24,
    paddingBottom: 16,
    alignContent:'center',
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#666',
    paddingHorizontal:0,

  },

  moreButton: {
    fontSize: 24,
    color: '#999',
    fontWeight: '700',
  },

  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },

  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 15,
    marginTop: 40,
  },

  quickAddButton: {
    position: 'absolute',
    bottom: 32,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 26,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  quickAddIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
  },

  quickAddText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 8,
  },
})