// // MenuContext.jsx
// import { createContext, useContext, useState } from "react";

// const MenuContext = createContext();

// export const MenuProvider = ({ children }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showHint, setShowHint] = useState(true);

//   return (
//     <MenuContext.Provider
//       value={{
//         isMenuOpen,
//         setIsMenuOpen,
//         showHint,
//         setShowHint,
//       }}
//     >
//       {children}
//     </MenuContext.Provider>
//   );
// };

// export const useMenu = () => useContext(MenuContext);

// MenuContext.jsx
import { createContext, useContext, useState } from "react";

const MenuContext = createContext();
const HINT_STORAGE_KEY = "hasm_menu_hint_seen";

export const MenuProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHint, setShowHintState] = useState(() => {
    try {
      return localStorage.getItem(HINT_STORAGE_KEY) !== "true";
    } catch {
      return true; // fallback if localStorage is blocked (e.g. private mode)
    }
  });

  const setShowHint = (value) => {
    setShowHintState(value);
    if (value === false) {
      try {
        localStorage.setItem(HINT_STORAGE_KEY, "true");
      } catch {
        // ignore write failures silently
      }
    }
  };

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