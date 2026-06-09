// MenuContext.jsx
import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);

  return (
    <MenuContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        showHint,
        setShowHint,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);