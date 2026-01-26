import React, { useMemo, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import { Priority, ScheduleType } from '../../../../types/todos'
import TaskFormHeader from './TaskFormHeader'
import TaskBasicFields from './TaskBasicFields'
import TaskPrioritySelector from './TaskPrioritySelector'
import TaskScheduleSelector from './TaskScheduleSelector'
import TaskDateTimeFields from './TaskDateTimeFields'
import TaskFormActions from './TaskFormActions'
import { useTaskForm } from './useTaskForm'

interface Props {
  sheetRef: React.RefObject<BottomSheetModal | null>
  groupId: string
  accentColor: string
  existingTodos?: Array<{
    scheduleType: ScheduleType
    startTime?: string
    endTime?: string
  }>
  onAdd: (data: {
    title: string
    description?: string
    priority: Priority
    scheduleType: ScheduleType
    startTime?: string
    endTime?: string
    dueDate?: string
  }) => void
  onCancel: () => void
}

const AddTaskBottomSheet: React.FC<Props> = ({
  sheetRef,
  accentColor,
  existingTodos = [],
  onAdd,
  onCancel,
}) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
    scheduleType,
    setScheduleType,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    dueDate,
    setDueDate,
    dueTime,
    setDueTime,
    scheduledDate,
    setScheduledDate,
    isSubmitting,
    timeConflictError,
    resetForm,
    handleSubmit,
  } = useTaskForm(existingTodos, onAdd)

  const snapPoints = useMemo(() => ['90%'], [])

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.4}
    />
  )

  const handleCancel = () => {
    resetForm()
    onCancel()
  }

  const handleScheduleTypeChange = (type: ScheduleType) => {
    setScheduleType(type)
    // Reset related fields when switching types
    if (type !== ScheduleType.TIME) {
      setStartTime(null)
      setEndTime(null)
      setScheduledDate(null) // NEW
    }
    if (type !== ScheduleType.DAY) {
      setDueDate(null)
      setDueTime(null)
    }
  }


  return (
    <BottomSheetModal
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      keyboardBehavior="interactive"
      android_keyboardInputMode="adjustResize"
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.sheetHandle}
    >
      <BottomSheetScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <TaskFormHeader />

        <TaskBasicFields
          title={title}
          description={description}
          accentColor={accentColor}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
        />

        <TaskPrioritySelector
          priority={priority}
          accentColor={accentColor}
          onPriorityChange={setPriority}
        />

        <TaskScheduleSelector
          scheduleType={scheduleType}
          accentColor={accentColor}
          onScheduleTypeChange={handleScheduleTypeChange}
        />

        <TaskDateTimeFields
          scheduleType={scheduleType}
          accentColor={accentColor}
          startTime={startTime}
          endTime={endTime}
          dueDate={dueDate}
          dueTime={dueTime}
          scheduledDate={scheduledDate}
          timeConflictError={timeConflictError}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
          onDueDateChange={setDueDate}
          onDueTimeChange={setDueTime}
          onScheduledDateChange={setScheduledDate}
        />

        <TaskFormActions
          accentColor={accentColor}
          canSubmit={title.trim().length > 0 && !isSubmitting}
          isSubmitting={isSubmitting}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}

export default AddTaskBottomSheet

const styles = StyleSheet.create({
  sheetBackground: { 
    backgroundColor: '#FFFFFF',
  },
  sheetHandle: { 
    backgroundColor: '#E5E7EB',
    width: 36,
    height: 5,
    borderRadius: 3,
  },
  content: {
    padding: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
})