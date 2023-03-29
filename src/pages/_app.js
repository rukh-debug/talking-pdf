import "@/styles/globals.scss";
import { ChatContextProvider } from "../ContextProvider/chatContext";
import { PdfContextProvider } from "../ContextProvider/pdfContext";
import { KeyContextProvider } from "../ContextProvider/keyContext";
import { ThemeContextProvider } from "../ContextProvider/themeContext";

import "@fontsource/roboto/300.css";

export default function App({ Component, pageProps }) {
  return (
    <PdfContextProvider>
      <ChatContextProvider>
        <KeyContextProvider>
          <ThemeContextProvider>
            <Component {...pageProps} />
          </ThemeContextProvider>
        </KeyContextProvider>
      </ChatContextProvider>
    </PdfContextProvider>
  );
}
