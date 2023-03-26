import { createContext, useState } from "react";

export const ChatContext = createContext();

export function ChatContextProvider({ children }) {
  const [chat, setChat] = useState({});

  return (
    <ChatContext.Provider value={{ chat, setChat }}>
      {children}
    </ChatContext.Provider>
  );
}
