import { createContext, useContext } from 'react'

type ModalType = 'ADD_TASK' | 'OPEN_BOARDS'

interface ModalState {
  type: ModalType | null
  props?: any
}

interface ModalContextValue {
  openModal: (type: ModalType, props?: any) => void
  closeModal: () => void
}

export const ModalContext = createContext<ModalContextValue | null>(null)

export const useModal = () => {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used inside ModalProvider')
  return ctx
}