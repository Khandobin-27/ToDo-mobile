import React, { useState } from 'react';
import { 
  SafeAreaView,
  KeyboardAvoidingView, 
  StyleSheet, 
  Text, View, 
  TextInput, 
  TouchableOpacity, 
  Keyboard, 
  ScrollView, 
  Platform
} from 'react-native';
import SafeViewAndroid from './components/SafeView'
import Task from './components/Task'
import uuid from 'react-native-uuid';


export default function App() {
  const [task, setTask] = useState()
  const [taskItems, setTaskItems] = useState([])

  const handleAddTask = () => {
    if ( task === '' || task === undefined ) return
      //make the keyboard go down
      Keyboard.dismiss()
      //so whatever was in the array plus one task
      setTaskItems([...taskItems, task])
      //to clear out the input
      setTask('')
  }

  const deleteTask = (index) => {

    let itemsCopy = [...taskItems]
    //remove one task from the array and store the updated array
    itemsCopy.splice(index, 1)
    //setting back but without one we have deleted
    setTaskItems(itemsCopy)
  }
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      {/*TASK AREA SECTION*/}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 85
        }}
        keyboardShouldPersistTaps='handled'
      >
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                  <Task 
                  key={uuid.v4()}
                  id={index}
                  text={item} 
                  deleteTask={deleteTask}
                  />
              )
            })
          }
        </View>
      </View>
      </ScrollView>

      {/*INPUT SECTION*/}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
          <TextInput 
          style={styles.input}
          placeholder={'Write a task'}
          onChangeText={text => setTask(text)}
          value={task}
          />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tasksWrapper: {
    paddingTop: 30,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 39,
    fontWeight: 'bold',
    color: '#ec4f72',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textShadowColor: 'white',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1
  },
  items: {
    marginTop: 14,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f3f3f3',
    borderRadius: 60,
    borderColor: '#ec4f72',
    borderWidth: 1,
    width: 250,
    borderWidth: 3
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#ec4f72',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 27,
    color: 'white',
  },
});
