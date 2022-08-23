import React, { useState } from "react";

import Navigation from "./src/navigation/Navigation";

import { NotesContext } from "./src/context/NotesContext";

export default function App() {
  const [notes, setNotes] = useState([]);

  const notesData = {
    notes: notes,
    setNotes: setNotes,
  };

  return (
    <NotesContext.Provider value={notesData}>
      <Navigation />
    </NotesContext.Provider>
  );
}
