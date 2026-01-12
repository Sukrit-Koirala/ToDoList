import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useToDo } from '../../../contexts/ToDoContext/ToDoProvider'
import {styles} from './ToDoHeader.styles'
import SelectGroupModal from '../SelectGroupModal/SelectGroupModal'
const ToDoHeader = () => {
    const {currentGroup,groups,setCurrentGroup} = useToDo();
    const [modalVisible, setModalVisible] = useState(false);

    const handleGroupSelect = (group: any) => {
    setCurrentGroup(group.id);
    };

  return (
    <>
    <View style={styles.container}>
        <TouchableOpacity 
          style={styles.titleButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.title}>{currentGroup?.name || 'My Tasks'}</Text>
          <Text style={styles.arrow}>▼</Text>
        </TouchableOpacity>
    </View>

    <SelectGroupModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        groups={groups}
        currentGroupId={currentGroup?.id || "DailyTaks"}
        onSelectGroup={handleGroupSelect}
      />

    </>
  )
}

export default ToDoHeader

//Checking to see if git commit works now

