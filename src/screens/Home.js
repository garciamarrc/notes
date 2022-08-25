import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useCallback } from "react";

import useNotes from "../hooks/useNotes";
import { deleteTask, getDbConnection, getTasks } from "../utils/db";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { useDatabaseContext } from "../context/DatabaseContext";
import CustomButton from "../components/CustomButton";

export default function Home() {
  const { notes, setNotes } = useNotes();
  const db = useDatabaseContext();

  const deleteTaskButton = async (id) => {
    await deleteTask(db, id);
    focusEffect();
  }

  const confirmDelete = (id, note) => {
    Alert.alert("Are you sure to delete this note?", `"${note}"`, [{ text: "Yes", onPress: () => deleteTaskButton(id) }, {text: 'No'}])
  };

  const focusEffect = useCallback(() => {
    const fetchDb = async () => {
      try {
        const tasksFromDatabase = await getTasks(db);
        setNotes(tasksFromDatabase);
      } catch (error) { }
    };
    fetchDb();
  }, [db]);

  useFocusEffect(focusEffect);

  return (
    <ScrollView>
      <View style={style.container}>
        {notes.length === 0 ? (
          <Text style={style.subtitle}>No notes yet</Text>
        ) : (
          notes.map((e) => (
            <View style={style.note} key={e.id}>
              <Text style={style.noteText}>{e.title}</Text>
              <CustomButton onPress={() => confirmDelete(e.id, e.title)} text={"Delete"} disabled={false} />
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  note: {
    width: "90%",
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "gray",
    margin: 5,
    padding: 10,
  },
  subtitle: {
    marginTop: 250,
    fontSize: 15,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10
  },
  noteText: {
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 20
  },
});
