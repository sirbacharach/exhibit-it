import { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserContextProvider = ({ children }) => {
  const [chicagoLoggedIn, setChicagoLoggedIn] = useState(false);

  return (
    <UserContext.Provider
      value={{ chicagoLoggedIn, setChicagoLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};
