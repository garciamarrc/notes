import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

export default function CustomDeleteButton({ onPress, text, disabled }) {
  if (disabled) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Cargando...</Text>
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
    backgroundColor: "red",

    width: "100%",

    padding: 10,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
});
