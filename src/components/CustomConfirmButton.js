import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

export default function CustomConfirmButton({ onPress, text, disabled }) {
  if (disabled) {
    return (
      <View style={styles.containerDisabled}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3871f3",

    width: "100%",

    padding: 10,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 5,
  },
  containerDisabled: {
    backgroundColor: "#3871f3",

    width: "100%",

    padding: 10,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 5,

    opacity: 0.5,
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
});
