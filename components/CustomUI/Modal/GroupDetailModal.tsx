import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTodos, toggleTodo, addTodo, TodoGroup } from '../../../api/todos'
import { useTheme } from '../../../hooks/useTheme'
import RoundedRectangle from '../RoundedRectangle/RoundedRectangle'
import TaskItem from './TaskModalCard'
import { Ionicons } from '@expo/vector-icons'

interface GroupDetailModalProps {
  group: {
    id: TodoGroup
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
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos(),
    select: (data) => data.filter((todo: any) => todo.groupId === group.id)
  })

  const toggleMutation = useMutation({
    mutationFn: (todoId: string) => toggleTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const addMutation = useMutation({
    mutationFn: (title: string) => addTodo({
      title,
      groupId: group.id,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setNewTaskTitle('')
      setShowAddModal(false)
    },
  })

  const groupTodos = todos.filter(
    (todo: any) => todo.groupId === group.id
  )

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addMutation.mutate(newTaskTitle.trim())
    }
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
        </View>
      </View>

      {/* CONTENT CARD */}
      <View style={styles.cardBg}>
        <RoundedRectangle
          radius={28}
          backgroundColor="#F5F5F5"
        >
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
                onToggle={() => toggleMutation.mutate(task.id)}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No tasks yet</Text>
          )}
        </BottomSheetScrollView>
      </View>

      {/* BOTTOM ACTION */}
      {onClose && (
        <TouchableOpacity
          onPress={() => setShowAddModal(true)}
          style={[styles.quickAddButton, { backgroundColor: cardColor || '#101010' }]}
        >
          <Text style={styles.quickAddIcon}>+</Text>
          <Text style={styles.quickAddText}>Quick Add</Text>
        </TouchableOpacity>
      )}

      {/* ADD TASK MODAL */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalOverlay}
            onPress={() => setShowAddModal(false)}
          >
            <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
              <View style={styles.addModalContent}>
                <Text style={styles.addModalTitle}>Add New Task</Text>
                
                <TextInput
                  style={styles.input}
                  placeholder="Task title..."
                  placeholderTextColor="#999"
                  value={newTaskTitle}
                  onChangeText={setNewTaskTitle}
                  autoFocus
                  onSubmitEditing={handleAddTask}
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => {
                      setNewTaskTitle('')
                      setShowAddModal(false)
                    }}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.modalButton,
                      styles.addButton,
                      { backgroundColor: cardColor || '#101010' },
                      !newTaskTitle.trim() && styles.addButtonDisabled
                    ]}
                    onPress={handleAddTask}
                    disabled={!newTaskTitle.trim() || addMutation.isPending}
                  >
                    <Text style={styles.addButtonText}>
                      {addMutation.isPending ? 'Adding...' : 'Add Task'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
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
    alignContent: 'center',
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#666',
    paddingHorizontal: 0,
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
    paddingTop:8,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
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

  // Add Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addModalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: 320,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },

  addModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },

  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },

  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  cancelButton: {
    backgroundColor: '#f0f0f0',
  },

  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },

  addButton: {
    backgroundColor: '#1a1a1a',
  },

  addButtonDisabled: {
    opacity: 0.5,
  },

  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})