import { useState, createContext, useEffect } from "react";

export const UsersContext = createContext({});

export default function UsersProvider({ children }) {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <UsersContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UsersContext.Provider>
  );
}
