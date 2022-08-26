import { View, TextInput, StyleSheet } from "react-native";
import React from "react";

export default function CustomInput({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  multiline = false,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
  },
  input: {},
});
