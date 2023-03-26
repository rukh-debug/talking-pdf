import "@/styles/globals.scss";
import { ChatContextProvider } from "../ContextProvider/chatContext";
import { PdfContextProvider } from "../ContextProvider/pdfContext";

import '@fontsource/roboto/300.css';

export default function App({ Component, pageProps }) {
  return (
    <PdfContextProvider>
      <ChatContextProvider>
        <Component {...pageProps} />
      </ChatContextProvider>
    </PdfContextProvider>
  );
}
