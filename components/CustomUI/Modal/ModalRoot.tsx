// modal/ModalRoot.tsx
import { Modal } from 'react-native'
import OpenBoardsModal from './OpenBoardsModal'

export const ModalRoot = ({ modal, closeModal }: any) => {
  if (!modal.type) return null

  return (
    <Modal transparent animationType="fade" visible>
      {/* {modal.type === 'ADD_TASK' && (
        <AddTaskModal {...modal.props} onClose={closeModal} />
      )} */}

      {modal.type === 'OPEN_BOARDS' && (
        <OpenBoardsModal {...modal.props} onClose={closeModal} />
      )}
    </Modal>
  )
}
