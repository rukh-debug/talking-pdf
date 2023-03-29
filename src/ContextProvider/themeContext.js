import { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
