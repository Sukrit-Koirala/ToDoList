// hooks/useTodoMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTodo } from '../api/todos'
import { Todo } from '../types/todos'

export const useUpdateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Omit<Todo, 'id' | 'createdAt'>> }) =>
      updateTodo(id, updates),
    onSuccess: () => {
      // Invalidate queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}