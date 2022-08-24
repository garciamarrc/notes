import { createContext, useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { createTables, getDbConnection } from "../utils/db";

const DatabaseContext = createContext();

export const useDatabaseContext = () => useContext(DatabaseContext);

export const DatabaseContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [database, setDatabase] = useState(null);

  useEffect(() => {
    const getConnection = async () => {
      const _db = await getDbConnection();
      await createTables(_db);
      setDatabase(_db);
      setIsLoading(false);
    };
    getConnection();
  }, []);

  if (isLoading) return <Text>Cargando...</Text>;

  return (
    <DatabaseContext.Provider value={database}>
      {children}
    </DatabaseContext.Provider>
  );
};
