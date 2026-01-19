// modal/ModalRoot.tsx
import React, { useRef, useMemo, useEffect } from 'react'
import OpenBoardsModal from './OpenBoardsModal'
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { Dimensions } from 'react-native'

export const ModalRoot = ({ modal, closeModal }: any) => {
  const sheetRef = useRef<BottomSheetModal>(null)

  const screenHeight = Dimensions.get('window').height

  // Use pixel values instead of percentages for more control
  const snapPoints = useMemo(() => [
    screenHeight * 0.5,  // 50% of screen
    screenHeight * 0.9,  // 90% of screen
  ], [screenHeight]) 

  useEffect(() => {
    if (modal.type === 'OPEN_BOARDS') {
      // Use presentModal with specific snap index
      requestAnimationFrame(() => {
        sheetRef.current?.snapToIndex(0);
        sheetRef.current?.present();
      });
    } else {
      sheetRef.current?.dismiss();
    }
  }, [modal.type]);

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.5}
      pressBehavior="close"
    />
  );

  if (modal.type !== 'OPEN_BOARDS') return null;

  return (
    <OpenBoardsModal
      sheetRef={sheetRef}
      snapPoints={snapPoints}
      onClose={closeModal}
      renderBackdrop={renderBackdrop}
      {...modal.props}
    />
  );
}