import { createContext, useState } from "react";

// Create the context
export const ListContext = createContext();

// Create the provider component
export const UserListProvider = ({ children }) => {
  const [tempList, setTempList] = useState([]);
  const [finalList, setFinalList] = useState([]);

  return (
    <ListContext.Provider
      value={{ tempList, setTempList, finalList, setFinalList }}
    >
      {children}
    </ListContext.Provider>
  );
};
