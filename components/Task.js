import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";

// instead of passing props, I destructured the props by passing them inside curly brackets to decrease repetition (no need for props.text, props.removeTask)
export default function Task({ text, removeTask, index }) {
  const [toggled, setIsToggled] = useState(true);

  const strikethrough = (index) => {
    setIsToggled(!toggled);
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        {toggled ? (
          <Text onPress={() => strikethrough(index)} style={styles.itemText}>
            {text}
          </Text>
        ) : (
          <Text
            onPress={() => strikethrough(index)}
            style={styles.strikethrough}
          >
            {text}
          </Text>
        )}
      </View>
      <Pressable>
        <View style={styles.remove}>
          <Text onPress={removeTask}>❌</Text>
        </View>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    alignItems: "center",
    flexWrap: "wrap",
    marginRight: 15,
  },
  itemText: {
    color: "black",
  },
  strikethrough: {
    color: "black",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});
