import React, { useState, useRef, useMemo } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { BottomSheetScrollView, BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTodos, toggleTodo, addTodo, deleteTodo } from '../../../api/todos'
import { useTheme } from '../../../hooks/useTheme'
import { Priority, ScheduleType } from '../../../types/todos'
import RoundedRectangle from '../RoundedRectangle/RoundedRectangle'
import TaskItem from './TaskModalCard'
import { Ionicons } from '@expo/vector-icons'
import AddTaskBottomSheet from './AddTaskModal'

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
  const queryClient = useQueryClient()
  const addTaskSheetRef = useRef<BottomSheetModal>(null)

  // Fetch todos for this group
  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['todos', group.id],
    queryFn: async () => {
      const allTodos = await getTodos()
      return allTodos.filter((todo: any) => todo.groupId === group.id)
    },
  })

  // Toggle todo completion
  const toggleMutation = useMutation({
    mutationFn: (todoId: string) => toggleTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  // Add new todo
const addMutation = useMutation({
  mutationFn: (data: {
    title: string
    description?: string
    priority: Priority
    scheduleType: ScheduleType | undefined
    startTime?: string
    endTime?: string
  }) =>
    addTodo({
      title: data.title,
      groupId: group.id,
      description: data.description,
      priority: data.priority,
      scheduleType: data.scheduleType,
      startTime: data.startTime,
      endTime: data.endTime,
    }),

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
    addTaskSheetRef.current?.dismiss()
  },
})

  // Delete todo
  const deleteMutation = useMutation({
    mutationFn: (taskId: string) => deleteTodo(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (error) => {
      console.error('Failed to delete task:', error)
    },
  })

  const handleAddTask = (data: {
  title: string
  description?: string
  priority: Priority

  scheduleType: ScheduleType
  startTime?: string
  endTime?: string
  dueDate?: string
}) => {

  console.log('[AddTask → handleAddTask]', data)

  addMutation.mutate(data)
}




  return (
    <View style={[styles.container, { backgroundColor: cardColor }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
          <Ionicons name="close" size={32} color="white" />
        </TouchableOpacity>

        <View style={styles.headerTop}>
          <Text style={styles.title}>{group.name}</Text>
          {todos.length > 0 && (
            <Text style={styles.subtitle}>
              {todos.filter((t: any) => t.completed).length} of {todos.length} completed
            </Text>
          )}
        </View>
      </View>

      {/* CONTENT CARD */}
      <View style={styles.cardBg}>
        <RoundedRectangle radius={28} backgroundColor="#F5F5F5">
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Tasks</Text>
            <TouchableOpacity>
              <Text style={styles.moreButton}>⋯</Text>
            </TouchableOpacity>
          </View>
        </RoundedRectangle>

        <BottomSheetScrollView
          style={styles.scrollViewWrapper}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {isLoading ? (
            <View style={styles.centerContent}>
              <Text style={styles.emptyText}>Loading...</Text>
            </View>
          ) : todos.length > 0 ? (
            todos.map((task: any, index: number) => (
              <TaskItem
                key={task.id}
                index={index + 1}
                title={task.title}
                completed={task.completed}
                time={task.time}
                duration={task.duration}
                location={task.location}
                onToggle={() => toggleMutation.mutate(task.id)}
                onDelete={() => deleteMutation.mutate(task.id)}
              />
            ))
          ) : (
            <View style={styles.centerContent}>
              <Text style={styles.emptyText}>No tasks yet</Text>
              <Text style={styles.emptySubtext}>
                Tap "Quick Add" below to create your first task
              </Text>
            </View>
          )}
        </BottomSheetScrollView>
      </View>

      {/* QUICK ADD BUTTON */}
      {onClose && (
        <TouchableOpacity
          onPress={() => addTaskSheetRef.current?.present()}
          style={[styles.quickAddButton, { backgroundColor: cardColor }]}
        >
          <Text style={styles.quickAddIcon}>+</Text>
          <Text style={styles.quickAddText}>Quick Add</Text>
        </TouchableOpacity>
      )}

      {/* ADD TASK BOTTOM SHEET */}
      <AddTaskBottomSheet
        sheetRef={addTaskSheetRef}
        groupId={group.id}
        accentColor={cardColor}
        onAdd={handleAddTask}
        onCancel={() => addTaskSheetRef.current?.dismiss()}
      />
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

  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
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
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#666',
  },

  moreButton: {
    fontSize: 24,
    color: '#999',
    fontWeight: '700',
  },

  scrollViewWrapper: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop: -21,
    paddingTop: 8,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
    flexGrow: 1,
  },

  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },

  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    fontWeight: '500',
  },

  emptySubtext: {
    textAlign: 'center',
    color: '#bbb',
    fontSize: 14,
    marginTop: 8,
    paddingHorizontal: 40,
  },

  quickAddButton: {
    position: 'absolute',
    bottom: 32,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 52,
    borderRadius: 26,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },

  quickAddIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    marginRight: 2,
  },

  quickAddText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 8,
  },
})