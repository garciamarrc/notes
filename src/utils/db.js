import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "tasks.db";

export const getDbConnection = async () => {
  return SQLite.openDatabase(DATABASE_NAME);
};

export const createTables = async (db) => {
  const query = `CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(521))`;
  db.transaction((tx) => tx.executeSql(query));
};

export const initDatabase = async () => {
  const db = await getDbConnection();
  await createTables(db);
};

export const insertTask = async (db, title) => {
  const insertQuery = `INSERT INTO tasks (title) VALUES ('${title}')`;
  db.transaction((tx) => tx.executeSql(insertQuery));
};

export const getTasks = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT id, title FROM tasks",
        null,
        (txObj, { rows: { _array } }) => {
          resolve(_array);
        }
      );
    });
  });
};

export const deleteTask = async (db, id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(`DELETE FROM tasks WHERE id = ${id}`, null, () =>
        resolve(true)
      );
    });
  });
};
