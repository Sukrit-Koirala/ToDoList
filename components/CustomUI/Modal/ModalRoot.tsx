// modal/ModalRoot.tsx
import React, { useRef, useMemo, useEffect } from 'react';
import OpenBoardsModal from './OpenBoardsModal';
import GroupDetailModal from './GroupDetailModal';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { Dimensions } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';

export const ModalRoot = ({ modal, closeModal }: any) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const screenHeight = Dimensions.get('window').height;
  const {theme} = useTheme();

  // Snap points for bottom sheet
  const snapPoints = useMemo(
    () => [screenHeight * 0.5, screenHeight * 0.9], 
    [screenHeight]
  );

  useEffect(() => {
    if (modal.type === 'OPEN_BOARDS' || modal.type === 'GROUP_DETAIL') {
      // Present bottom sheet when either modal type is active
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

  // OPEN_BOARDS modal
  if (modal.type === 'OPEN_BOARDS') {
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

  // GROUP_DETAIL modal
  if (modal.type === 'GROUP_DETAIL') {
    return (
      <BottomSheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onDismiss={closeModal}
        enableDynamicSizing={false}

        backgroundStyle={{
          backgroundColor: modal.props.cardColor,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        }}

        handleIndicatorStyle={{ backgroundColor: theme.background }}
      >

        <GroupDetailModal
          group={modal.props.group}
          cardColor={modal.props.cardColor}
          onClose={closeModal}
        />
      </BottomSheetModal>
    );
  }

  return null;
};
