import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useCallback } from "react";

import useNotes from "../hooks/useNotes";
import { getTasks } from "../utils/db";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Card } from "@rneui/base";
import { useDatabaseContext } from "../context/DatabaseContext";

export default function Home() {
  const { notes, setNotes } = useNotes();
  const db = useDatabaseContext();
  const navigation = useNavigation();

  const focusEffect = useCallback(() => {
    const fetchDb = async () => {
      try {
        const tasksFromDatabase = await getTasks(db);
        setNotes(tasksFromDatabase);
      } catch (error) {}
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
            <TouchableOpacity
              onPress={() => navigation.navigate("EditNote", { id: e.id })}
            >
              <Card key={e.id}>
                <Text style={style.title}>{e.title}</Text>
                <Card.Divider />
                <Text>{e.description}</Text>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 2,
  },
  subtitle: {
    marginTop: 250,
    fontSize: 15,
    textAlign: "center",
  },
  container: {
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  noteText: {
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
});
