import { createContext, useState } from "react";

export const PdfContext = createContext();

export function PdfContextProvider({ children }) {
  const [pdfContext, setPdfContext] = useState({});

  return (
    <PdfContext.Provider value={{ pdfContext, setPdfContext }}>
      {children}
    </PdfContext.Provider>
  );
}
