import Head from "next/head";
import Image from "next/image";
import { useState, useContext } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { PdfContext } from "@/ContextProvider/pdfContext";

import Chat from "@/components/Chat";
import Uploader from "@/components/Uploader";

import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Home() {
  const [chatFullScreen, setChatFullScreen] = useState(false);

  const { pdfContext } = useContext(PdfContext);

  return (
    <>
      <Head>
        <title>talking PDF</title>
        <meta name="description" content="PDF that talks" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme />
        <Container maxWidth="md">
          <Header />
          <Uploader />
          {pdfContext?.name ? <Chat /> : null}
        </Container>
      </ThemeProvider>
    </>
  );
}
