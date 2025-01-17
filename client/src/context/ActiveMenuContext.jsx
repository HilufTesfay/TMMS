import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ActiveMenuContext = createContext();

export const ActiveMenuProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);

  const toggle = () => {
    setActiveMenu((prev) => !prev);
  };

  return (
    <ActiveMenuContext.Provider value={{ toggle, activeMenu }}>
      {children}
    </ActiveMenuContext.Provider>
  );
};

export const useActiveMenu = () => useContext(ActiveMenuContext);

ActiveMenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
