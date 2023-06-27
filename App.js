import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Keyboard,
} from "react-native";
import Task from "./components/Task";
import React, { useState } from "react";

export default function App() {
  const [task, setTask] = useState();
  const [taskList, setTaskList] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskList([...taskList, task]);
    setTask(null);
  };

  // pass these to the child component (Task) so it can use this function
  const removeTask = (index) => {
    let listCopy = [...taskList];
    listCopy.splice(index, 1);
    setTaskList(listCopy);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.taskWrapper}>
          <Text style={styles.title}>Todo List</Text>
          {taskList.length === 0 ? (
            <View style={styles.instructions}>
              <Text>Click ❌ to remove item</Text>
              <Text>Click on task to strikethrough</Text>
            </View>
          ) : null}
          {/* the map function gives us access to the index and by passing this to the child component, it is able to access it and use it for the strikethrough and removeTask functions */}
          {/* text is a variable that we chose and {item} is what is being iterated through the map function */}
          <View style={styles.items}>
            {taskList.map((item, index) => {
              return (
                <Task
                  removeTask={() => removeTask(index)}
                  key={index}
                  index={index}
                  text={item}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />

      {/* this is where the task entry goes and we want it to move with the keyboard */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTask}
      >
        {/* value=task helps reflect the change real time */}
        <TextInput
          onChangeText={(text) => setTask(text)}
          value={task}
          style={styles.input}
          placeholder="Add task"
        />
        <Pressable onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTask: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: "white",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  instructions: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
