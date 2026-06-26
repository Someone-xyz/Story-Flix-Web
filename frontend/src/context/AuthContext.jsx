import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [userId, setUserId] = useState(
    localStorage.getItem("userId") || null
  );

  const login = (id) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userId", id);

    setIsAuthenticated(true);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");

    setIsAuthenticated(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userId,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;