import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback } from "react";

import useNotes from "../hooks/useNotes";
import { getNotes } from "../utils/db";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Card } from "@rneui/base";
import { useDatabaseContext } from "../context/DatabaseContext";

export default function Home() {
  const { notes, setNotes } = useNotes();
  const db = useDatabaseContext();
  const navigation = useNavigation();

  const showOnly25Chars = (text) => {
    if (text.length > 25) {
      return `${text.substring(0, 25)}...`;
    }
    return text;
  };

  const focusEffect = useCallback(() => {
    const fetchDb = async () => {
      const notesFromDatabase = await getNotes(db);
      setNotes(notesFromDatabase);
    };
    fetchDb();
  }, [db]);

  useFocusEffect(focusEffect);

  return (
    <ScrollView style={styles.root}>
      <View style={styles.container}>
        {notes.length === 0 ? (
          <Text style={styles.subtitle}>No notes yet</Text>
        ) : (
          notes.map((e) => {
            const shortDescription = showOnly25Chars(e.description);
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditNote", { id: e.id, title: e.title })
                }
                key={e.id}
              >
                <Card>
                  <Text style={styles.title}>{e.title}</Text>
                  <Card.Divider />
                  <Text style={styles.description}>{shortDescription}</Text>
                </Card>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 2,
    color: "black",
  },
  description: {
    color: "black",
  },
  subtitle: {
    marginTop: 250,
    fontSize: 15,
    textAlign: "center",
    color: "black",
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
