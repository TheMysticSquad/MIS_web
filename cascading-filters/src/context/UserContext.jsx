// src/context/UserContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore user from sessionStorage on app start
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const employee_id = sessionStorage.getItem("employee_id");
    const role = sessionStorage.getItem("role");

    if (token && employee_id && role) {
      setUser({ employee_id, role });
    }
  }, []);

  const loginUser = (email, password) => {
    return fetch("https://mis-test-api.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Login failed");
        return res.json();
      })
      .then((data) => {
        sessionStorage.setItem("token", data.access_token);
        sessionStorage.setItem("employee_id", data.employee_id);
        sessionStorage.setItem("role", data.role);
        setUser({ employee_id: data.employee_id, role: data.role });
        return data;
      });
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
