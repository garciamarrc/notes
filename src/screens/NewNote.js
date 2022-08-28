import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import { insertNote } from "../utils/db";
import { useDatabaseContext } from "../context/DatabaseContext";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomConfirmButton";

export default function NewNote({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const db = useDatabaseContext();

  const handleSubmit = async () => {

    let toInsertTitle;

    if (title === "") {
      toInsertTitle = "Untitled";
    } else {
      toInsertTitle = title;
    }

    await insertNote(
      db,
      toInsertTitle.replace("'", "''"),
      description.replace("'", "''")
    );
    setTitle("");
    setDescription("");
    navigation.navigate("MyNotes");
  };

  return (
    <ScrollView style={styles.root}>
      <View style={{ marginTop: 50 }}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    backgroundColor: "#212121"
  },
});
