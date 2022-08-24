import React, { useState } from "react";

import Navigation from "./src/navigation/Navigation";

import { NotesContext } from "./src/context/NotesContext";
import { DatabaseContextProvider } from "./src/context/DatabaseContext";

export default function App() {
  const [notes, setNotes] = useState([]);
  const notesData = {
    notes: notes,
    setNotes: setNotes,
  };

  return (
    <DatabaseContextProvider>
      <NotesContext.Provider value={notesData}>
        <Navigation />
      </NotesContext.Provider>
    </DatabaseContextProvider>
  );
}
