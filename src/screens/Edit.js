import { Alert, TextInput, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "@rneui/base";
import { getTask, updateTask, deleteTask } from "../utils/db";
import { useDatabaseContext } from "../context/DatabaseContext";
import CustomDeleteButton from "../components/CustomDeleteButton";
import CustomConfirmButton from "../components/CustomConfirmButton";
import { useNavigation } from "@react-navigation/native";

export default function Edit({ route }) {
  const [note, setNote] = useState({});
  const [noteChanged, setNoteChanged] = useState(false);

  const { id } = route.params;
  const db = useDatabaseContext();
  const navigation = useNavigation();

  const deleteTaskButton = async (id) => {
    await deleteTask(db, id);
    navigation.navigate("Home");
  };

  const confirmDelete = () => {
    Alert.alert("Are you sure to delete this note?", `"${note.title}"`, [
      { text: "No" },
      { text: "Yes", onPress: () => deleteTaskButton(id) },
    ]);
  };

  const setNoteTitle = (e) => {
    setNote({ ...note, title: e });
    setNoteChanged(true);
  };

  const setNoteDescription = (e) => {
    setNote({ ...note, description: e });
    setNoteChanged(true);
  };

  const updateNote = async () => {
    await updateTask(db, note, id);
    navigation.navigate("Home");
  };

  useEffect(() => {
    getTask(db, id).then((note) => setNote(note));
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
        <CustomDeleteButton
          text={"Delete"}
          onPress={confirmDelete}
          disabled={false}
        />
        {noteChanged ? (
          <CustomConfirmButton
            text={"Save"}
            onPress={updateNote}
            disabled={false}
          />
        ) : (
          ""
        )}
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
});
