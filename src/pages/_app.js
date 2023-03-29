import "@/styles/globals.scss";
import { ChatContextProvider } from "../ContextProvider/chatContext";
import { PdfContextProvider } from "../ContextProvider/pdfContext";
import { KeyContextProvider } from "../ContextProvider/keyContext";

import "@fontsource/roboto/300.css";

export default function App({ Component, pageProps }) {
  return (
    <PdfContextProvider>
      <ChatContextProvider>
        <KeyContextProvider>
          <Component {...pageProps} />
        </KeyContextProvider>
      </ChatContextProvider>
    </PdfContextProvider>
  );
}
