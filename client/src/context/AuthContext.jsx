import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState(null);
  //login function
  const login = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
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
