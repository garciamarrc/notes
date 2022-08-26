import { Alert, TextInput, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "@rneui/base";
import { getNote, updateNote, deleteNote } from "../utils/db";
import { useDatabaseContext } from "../context/DatabaseContext";
import CustomDeleteButton from "../components/CustomDeleteButton";
import CustomConfirmButton from "../components/CustomConfirmButton";
import { useNavigation } from "@react-navigation/native";

export default function Edit({ route }) {
  const [note, setNote] = useState({});
  const [btnDisabled, setBtnDisabled] = useState(true);

  const { id, title } = route.params;
  const db = useDatabaseContext();
  const navigation = useNavigation();

  const deleteNoteConfirmed = async (id) => {
    await deleteNote(db, id);
    navigation.navigate("Home");
  };

  const confirmDelete = () => {
    Alert.alert("Are you sure to delete this note?", `"${note.title}"`, [
      { text: "No" },
      { text: "Yes", onPress: () => deleteNoteConfirmed(id) },
    ]);
  };

  const setNoteTitle = (e) => {
    setNote({ ...note, title: e });
    setBtnDisabled(false);
  };

  const setNoteDescription = (e) => {
    setNote({ ...note, description: e });
    setBtnDisabled(false);
  };

  const updateNoteButton = async () => {
    await updateNote(db, note, id);
    navigation.navigate("Home");
  };

  useEffect(() => {
    navigation.setOptions({ headerTitle: title });
    getNote(db, id).then((note) => setNote(note));
  }, []);

  return (
    <ScrollView>
      <Card>
        <TextInput
          style={styles.title}
          value={note.title}
          onChangeText={setNoteTitle}
        />
        <Card.Divider />
        <TextInput
          multiline={true}
          value={note.description}
          onChangeText={setNoteDescription}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <CustomDeleteButton
              text={"Delete"}
              onPress={confirmDelete}
              disabled={false}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomConfirmButton
              text={"Update"}
              onPress={updateNoteButton}
              disabled={btnDisabled}
            />
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 2,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  buttonContainer: {
    width: "40%",
  },
});
