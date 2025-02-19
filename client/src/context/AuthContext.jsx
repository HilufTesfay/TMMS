import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { authService } from "../services";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  //login function
  const login = () => {
    setIsAuthenticated(authService.isLoggedIn());
    setUserRole(authService.getRole());
  };
  //logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.object,
};
