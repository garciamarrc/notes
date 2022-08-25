import { View, StyleSheet } from "react-native";
import React, { useState } from "react";

import { Alert } from "react-native";

import { insertTask } from "../utils/db";
import { useDatabaseContext } from "../context/DatabaseContext";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function NewNote({ navigation }) {
  const [note, setNote] = useState("");
  const db = useDatabaseContext();

  const handleSubmit = async () => {
    if (note === "") {
      Alert.alert("You can't save an empty note");
      return;
    }

    if (note.length > 512) {
      Alert.alert("You can't save notes longer than 512 characters");
      return;
    }

    try {
      await insertTask(db, note);
      setNote("");
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.root}>
      <CustomInput
        value={note}
        setValue={setNote}
        placeholder={"Write your note"}
        secureTextEntry={false}
      />
      <CustomButton onPress={handleSubmit} text={"Save"} disabled={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
});
