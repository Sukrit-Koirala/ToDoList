import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ModalHeaderProps } from './SelectGroupModal.types';
import { styles } from './SelectGroupModal.styles';

export const ModalHeader: React.FC<ModalHeaderProps> = ({ 
  onCancel, 
  onDone 
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        onPress={onCancel}
        hitSlop={styles.hitSlop}
      >
        <Text style={styles.cancelButton}>Cancel</Text>
      </TouchableOpacity>
      
      <Text style={styles.headerTitle}>Select Group</Text>
      
      <TouchableOpacity 
        onPress={onDone}
        hitSlop={styles.hitSlop}
      >
        <Text style={styles.doneButton}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};