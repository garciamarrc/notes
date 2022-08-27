import { ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";

import { Alert } from "react-native";

import { insertNote } from "../utils/db";
import { useDatabaseContext } from "../context/DatabaseContext";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomConfirmButton";

export default function NewNote({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const db = useDatabaseContext();

  const handleSubmit = async () => {
    if (title === "") {
      Alert.alert("You can't save an empty title");
      return;
    }

    if (description === "") {
      Alert.alert("You can't save an empty description");
      return;
    }

    try {
      await insertNote(
        db,
        title.replace("'", "''"),
        description.replace("'", "''")
      );
      setTitle("");
      setDescription("");
      navigation.navigate("MyNotes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.root}>
      <CustomInput
        value={title}
        setValue={setTitle}
        placeholder={"Title"}
        secureTextEntry={false}
      />
      <CustomInput
        value={description}
        setValue={setDescription}
        placeholder={"Description"}
        secureTextEntry={false}
        multiline={true}
      />
      <CustomButton onPress={handleSubmit} text={"Save"} disabled={false} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    backgroundColor: "#212121"
  },
});
