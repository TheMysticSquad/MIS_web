// src/context/UserContext.jsx
import React, { createContext, useState, useContext } from "react";

// ✅ Create and export context
export const UserContext = createContext();

// ✅ Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Custom hook (optional, for easy use)
export const useUser = () => useContext(UserContext);
