import { View, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";

import { Button } from "@rneui/themed";
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
      Alert.alert("No puedes guardar notas vacias");
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
        placeholder={"Escribe tu nota"}
        secureTextEntry={false}
      />
      <CustomButton onPress={handleSubmit} text={"Guardar"} disabled={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
});
