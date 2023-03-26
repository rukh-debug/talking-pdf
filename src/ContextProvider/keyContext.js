import { createContext, useState } from "react";

export const KeyContext = createContext();

export function ChatContextProvider({ children }) {
  const [openAiKey, setOpenAiKey] = useState("");

  return (
    <KeyContext.Provider value={{ openAiKey, openAiKey }}>
      {children}
    </KeyContext.Provider>
  );
}
