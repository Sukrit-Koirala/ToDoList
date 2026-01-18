// modal/ModalProvider.tsx
import React, { useState } from 'react'
import { ModalContext } from './ModalContext'
import { ModalRoot } from './ModalRoot'

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modal, setModal] = useState<{
    type: any
    props?: any
  }>({ type: null })

  const openModal = (type: any, props?: any) => {
    setModal({ type, props })
  }

  const closeModal = () => {
    setModal({ type: null })
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ModalRoot modal={modal} closeModal={closeModal} />
    </ModalContext.Provider>
  )
}
