import { createContext, useState } from "react";

export const KeyContext = createContext();

export function KeyContextProvider({ children }) {
  const [openAiKey, setOpenAiKey] = useState({});

  return (
    <KeyContext.Provider value={{ openAiKey, setOpenAiKey }}>
      {children}
    </KeyContext.Provider>
  );
}
