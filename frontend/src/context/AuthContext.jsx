import { createContext, useContext, useState } from "react";
const C = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("hash-user"));
    } catch {
      return null;
    }
  });
  const login = (data) => {
    setUser(data);
    localStorage.setItem("hash-user", JSON.stringify(data));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("hash-user");
  };
  return <C.Provider value={{ user, login, logout }}>{children}</C.Provider>;
}
export function useAuth() {
  return useContext(C);
}
