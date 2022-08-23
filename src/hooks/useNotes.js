import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

export default function () {
  return useContext(NotesContext);
}
