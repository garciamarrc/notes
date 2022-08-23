import { View, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";

import { Button } from "@rneui/themed";
import { Alert } from "react-native";

import useNotes from "../hooks/useNotes";

export default function NewNote({ navigation }) {
  const { notes, setNotes } = useNotes();
  const [note, setNote] = useState("");

  const handleChange = (e) => {
    setNote(e);
  };

  const handleSubmit = () => {
    if (note === "") {
      Alert.alert("No puedes guardar notas vacias");
      return;
    }
    setNotes([...notes, note]);
    setNote("");
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        multiline
        style={style.input}
        value={note}
        onChangeText={handleChange}
      />
      <Button
        buttonStyle={{ borderRadius: 10 }}
        title="Guardar"
        onPress={handleSubmit}
      />
    </View>
  );
}

const style = StyleSheet.create({
  input: {
    width: 250,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
  },
});
