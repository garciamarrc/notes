import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "notes.db";

export const getDbConnection = async () => {
  return SQLite.openDatabase(DATABASE_NAME);
};

export const createTables = async (db) => {
  const query = `CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT)`;
  db.transaction((tx) => tx.executeSql(query));
};

export const initDatabase = async () => {
  const db = await getDbConnection();
  await createTables(db);
};

export const insertNote = async (db, title, description) => {
  const insertQuery = `INSERT INTO notes (title, description) VALUES ('${title}', '${description}')`;
  db.transaction((tx) => tx.executeSql(insertQuery));
};

export const getNotes = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT id, title, description FROM notes",
        null,
        (txObj, { rows: { _array } }) => {
          resolve(_array);
        }
      );
    });
  });
};

export const getNote = async (db, id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT id, title, description FROM notes WHERE id = ?",
        [id],
        (txObj, { rows: { _array } }) => {
          resolve(_array[0]);
        }
      );
    });
  });
};

export const updateNote = async (db, { title, description }, id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE notes SET title = ?, description = ? WHERE id = ?`,
        [title, description, id],
        () => resolve(true)
      );
    });
  });
};

export const deleteNote = async (db, id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(`DELETE FROM notes WHERE id = ${id}`, null, () =>
        resolve(true)
      );
    });
  });
};
