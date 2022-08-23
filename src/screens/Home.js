import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

import useNotes from "../hooks/useNotes";

export default function Home() {
  const { notes } = useNotes();

  return (
    <ScrollView>
      <View style={style.container}>
        {notes.length === 0 ? (
          <Text style={style.subtitle}>Aun no hay notas</Text>
        ) : (
          notes.map((e, index) => (
            <Text style={style.note} key={index}>
              {e}
            </Text>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  note: {
    borderRadius: 10,
    width: "40%",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    backgroundColor: "white",
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
  },
});
